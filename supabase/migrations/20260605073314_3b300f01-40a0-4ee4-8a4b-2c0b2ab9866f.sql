
CREATE TYPE public.inquiry_status AS ENUM ('New', 'Contacted', 'Quoted', 'Closed');

CREATE TABLE public.quote_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  business_name TEXT,
  email TEXT NOT NULL,
  whatsapp_number TEXT,
  country TEXT,
  product_type TEXT,
  size_required TEXT,
  quantity TEXT,
  lighting_option TEXT,
  material_finish TEXT,
  deadline TEXT,
  file_url TEXT,
  notes TEXT,
  status public.inquiry_status NOT NULL DEFAULT 'New',
  source TEXT NOT NULL DEFAULT 'Website Landing Page',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.quote_inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quote_inquiries TO authenticated;
GRANT ALL ON public.quote_inquiries TO service_role;

ALTER TABLE public.quote_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
  ON public.quote_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
