alter table public.quote_inquiries
add column if not exists file_urls jsonb not null default '[]'::jsonb;

update public.quote_inquiries
set file_urls = case
  when file_url is null or btrim(file_url) = '' then '[]'::jsonb
  when btrim(file_url) like '[%' then file_url::jsonb
  else jsonb_build_array(file_url)
end
where file_url is not null
  and (
    file_urls = '[]'::jsonb
    or file_urls is null
  );

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
