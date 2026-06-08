create extension if not exists pgcrypto;

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public' and t.typname = 'inquiry_status'
  ) then
    create type public.inquiry_status as enum ('New', 'Contacted', 'Quoted', 'Closed');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public' and t.typname = 'app_role'
  ) then
    create type public.app_role as enum ('admin');
  end if;
end $$;

create table if not exists public.quote_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  business_name text,
  email text not null,
  whatsapp_number text,
  country text,
  product_type text,
  size_required text,
  quantity text,
  lighting_option text,
  material_finish text,
  deadline text,
  file_url text,
  file_urls jsonb not null default '[]'::jsonb,
  notes text,
  status public.inquiry_status not null default 'New',
  source text not null default 'Website Landing Page',
  created_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  constraint user_roles_user_id_role_key unique (user_id, role)
);

grant usage on schema public to anon, authenticated, service_role;
grant select, insert on public.quote_inquiries to anon;
grant select, insert, update on public.quote_inquiries to authenticated;
grant all on public.quote_inquiries to service_role;
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.quote_inquiries enable row level security;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  );
$$;

insert into storage.buckets (id, name, public)
select 'quote-uploads', 'quote-uploads', false
where not exists (
  select 1 from storage.buckets where id = 'quote-uploads'
);

drop policy if exists "Anyone can submit an inquiry" on public.quote_inquiries;
create policy "Anyone can submit an inquiry"
on public.quote_inquiries
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can view all inquiries" on public.quote_inquiries;
create policy "Admins can view all inquiries"
on public.quote_inquiries
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can update inquiries" on public.quote_inquiries;
create policy "Admins can update inquiries"
on public.quote_inquiries
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Users can view their own roles" on public.user_roles;
create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Public can upload quote files" on storage.objects;
create policy "Public can upload quote files"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'quote-uploads'
  and name like 'quote-inquiries/%'
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'pdf', 'svg', 'ai', 'eps')
  and coalesce((metadata->>'size')::bigint, 0) <= 10485760
);

drop policy if exists "Admins can read quote-uploads" on storage.objects;
create policy "Admins can read quote-uploads"
on storage.objects
for select
to authenticated
using (bucket_id = 'quote-uploads' and public.has_role(auth.uid(), 'admin'));
