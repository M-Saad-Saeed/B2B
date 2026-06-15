drop policy if exists "Public can upload quote files"
on storage.objects;

create policy "Public can upload quote files"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'quote-uploads'
  and name like 'quote-inquiries/%'
  and name not like '%/../%'
  and lower(storage.extension(name)) in (
    'jpg',
    'jpeg',
    'png',
    'webp',
    'pdf',
    'svg',
    'ai',
    'eps'
  )
);

update storage.buckets
set
  file_size_limit = 10485760,
  allowed_mime_types = array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'image/svg+xml',
    'application/postscript',
    'application/illustrator',
    'application/vnd.adobe.illustrator',
    'application/eps',
    'application/x-illustrator',
    'application/x-eps'
  ]::text[],
  public = false
where id = 'quote-uploads';
