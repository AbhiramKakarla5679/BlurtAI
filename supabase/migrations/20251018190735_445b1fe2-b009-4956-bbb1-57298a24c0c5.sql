-- Create practice_sessions table to track completed practice sessions
CREATE TABLE IF NOT EXISTS public.practice_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  section_id uuid NOT NULL REFERENCES public.sections(id),
  overall_score integer NOT NULL,
  max_marks integer NOT NULL,
  questions_count integer NOT NULL DEFAULT 1,
  key_ideas_covered text[] NOT NULL DEFAULT '{}',
  key_ideas_missed text[] NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own practice sessions" 
ON public.practice_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own practice sessions" 
ON public.practice_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX idx_practice_sessions_user_id ON public.practice_sessions(user_id);
CREATE INDEX idx_practice_sessions_section_id ON public.practice_sessions(section_id);