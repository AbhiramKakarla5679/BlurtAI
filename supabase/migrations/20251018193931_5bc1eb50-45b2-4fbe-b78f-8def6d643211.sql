-- Add topic_slug and subsection_slug to practice_sessions for proper linking
ALTER TABLE public.practice_sessions 
ADD COLUMN topic_slug text,
ADD COLUMN subsection_slug text;