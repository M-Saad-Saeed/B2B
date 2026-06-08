
CREATE POLICY "Public can upload quote files"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'quote-uploads');
