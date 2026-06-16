alter table public.quote_inquiries
add column if not exists installation_environment text;

alter table public.quote_inquiries
add constraint quote_inquiries_installation_environment_values
check (
  installation_environment is null
  or installation_environment in ('Indoor', 'Outdoor')
) not valid;

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
  and installation_environment in ('Indoor', 'Outdoor')
  and (quantity is null or char_length(btrim(quantity)) <= 40)
  and (lighting_option is null or char_length(lighting_option) <= 40)
  and (material_finish is null or char_length(btrim(material_finish)) <= 200)
  and (deadline is null or char_length(btrim(deadline)) <= 80)
  and (notes is null or char_length(btrim(notes)) <= 2000)
  and jsonb_typeof(file_urls) = 'array'
  and jsonb_array_length(file_urls) <= 5
  and (file_url is null or file_url like 'quote-inquiries/%')
);
