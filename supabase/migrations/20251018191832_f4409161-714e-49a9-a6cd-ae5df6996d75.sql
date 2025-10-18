-- Add theme preference to user_settings table
ALTER TABLE public.user_settings ADD COLUMN IF NOT EXISTS theme text NOT NULL DEFAULT 'system';

-- Add a check constraint to ensure valid theme values
ALTER TABLE public.user_settings ADD CONSTRAINT valid_theme CHECK (theme IN ('light', 'dark', 'system'));