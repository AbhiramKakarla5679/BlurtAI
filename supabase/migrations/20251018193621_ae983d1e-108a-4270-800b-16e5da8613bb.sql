-- Make section_id nullable in practice_sessions since we track by subsection_title
ALTER TABLE public.practice_sessions 
ALTER COLUMN section_id DROP NOT NULL;