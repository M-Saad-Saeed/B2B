revoke select, update, delete on public.quote_inquiries from anon;
revoke delete on public.quote_inquiries from authenticated;

alter table public.quote_inquiries
  add constraint quote_inquiries_full_name_length
  check (char_length(btrim(full_name)) between 1 and 120) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_email_length
  check (char_length(btrim(email)) between 1 and 255) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_business_name_length
  check (business_name is null or char_length(btrim(business_name)) <= 160) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_whatsapp_number_length
  check (whatsapp_number is null or char_length(btrim(whatsapp_number)) <= 40) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_country_length
  check (country is null or char_length(btrim(country)) <= 80) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_product_type_length
  check (product_type is null or char_length(product_type) <= 80) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_size_required_length
  check (size_required is null or char_length(btrim(size_required)) <= 120) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_quantity_length
  check (quantity is null or char_length(btrim(quantity)) <= 40) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_lighting_option_length
  check (lighting_option is null or char_length(lighting_option) <= 40) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_material_finish_length
  check (material_finish is null or char_length(btrim(material_finish)) <= 200) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_deadline_length
  check (deadline is null or char_length(btrim(deadline)) <= 80) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_notes_length
  check (notes is null or char_length(btrim(notes)) <= 2000) not valid;

alter table public.quote_inquiries
  add constraint quote_inquiries_file_urls_shape
  check (jsonb_typeof(file_urls) = 'array' and jsonb_array_length(file_urls) <= 5) not valid;

drop policy if exists "Allow public inserts" on public.quote_inquiries;
drop policy if exists "Anyone can submit an inquiry" on public.quote_inquiries;
create policy "Anyone can submit an inquiry"
on public.quote_inquiries
for insert
to anon, authenticated
with check (
  status = 'New'::public.inquiry_status
  and source = 'Website Landing Page'
  and char_length(btrim(full_name)) between 1 and 120
  and char_length(btrim(email)) between 1 and 255
  and (business_name is null or char_length(btrim(business_name)) <= 160)
  and (whatsapp_number is null or char_length(btrim(whatsapp_number)) <= 40)
  and (country is null or char_length(btrim(country)) <= 80)
  and (product_type is null or char_length(product_type) <= 80)
  and (size_required is null or char_length(btrim(size_required)) <= 120)
  and (quantity is null or char_length(btrim(quantity)) <= 40)
  and (lighting_option is null or char_length(lighting_option) <= 40)
  and (material_finish is null or char_length(btrim(material_finish)) <= 200)
  and (deadline is null or char_length(btrim(deadline)) <= 80)
  and (notes is null or char_length(btrim(notes)) <= 2000)
  and jsonb_typeof(file_urls) = 'array'
  and jsonb_array_length(file_urls) <= 5
  and (file_url is null or file_url like 'quote-inquiries/%')
);

drop policy if exists "Public can upload quote files" on storage.objects;
create policy "Public can upload quote files"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'quote-uploads'
  and name like 'quote-inquiries/%'
  and name not like '%/../%'
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'pdf', 'svg', 'ai', 'eps')
  and metadata ? 'size'
  and (metadata->>'size') ~ '^[0-9]+$'
  and (metadata->>'size')::bigint <= 10485760
);
