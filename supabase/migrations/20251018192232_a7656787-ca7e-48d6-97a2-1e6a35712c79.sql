-- Add subsection_title to practice_sessions to track specific subsections
ALTER TABLE public.practice_sessions ADD COLUMN IF NOT EXISTS subsection_title text;

-- Clear all existing practice session data
DELETE FROM public.practice_sessions;