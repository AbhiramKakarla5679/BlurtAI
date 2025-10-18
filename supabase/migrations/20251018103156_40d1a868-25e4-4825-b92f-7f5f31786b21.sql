-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create sections table for chemistry topics
CREATE TABLE public.sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  spec_tag TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Foundation', 'Higher')),
  learning_objectives TEXT[] NOT NULL,
  content TEXT NOT NULL,
  keywords TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for sections (public read access)
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sections"
  ON public.sections FOR SELECT
  USING (true);

-- Create submissions table for blur attempts
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  score INTEGER,
  keywords_found TEXT[],
  keywords_missed TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Submissions policies
CREATE POLICY "Users can view their own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample chemistry sections
INSERT INTO public.sections (title, spec_tag, level, learning_objectives, content, keywords) VALUES
(
  'Atomic Structure and the Periodic Table',
  '4.1.1',
  'Foundation',
  ARRAY[
    'Describe the structure of an atom',
    'Explain the arrangement of electrons in shells',
    'Understand how the periodic table is organized'
  ],
  E'# Atomic Structure\n\nAtoms are the building blocks of all matter. Every atom consists of:\n\n## The Nucleus\n- Contains **protons** (positive charge)\n- Contains **neutrons** (no charge)\n- Very small but contains most of the mass\n\n## Electrons\n- Negative charge\n- Orbit the nucleus in shells (energy levels)\n- The first shell can hold up to 2 electrons\n- The second and third shells can hold up to 8 electrons\n\n## The Periodic Table\nElements are arranged in order of atomic number (number of protons). Elements in the same group have similar properties because they have the same number of electrons in their outer shell.',
  ARRAY['atom', 'protons', 'neutrons', 'electrons', 'nucleus', 'shells', 'periodic table', 'atomic number', 'group']
),
(
  'Chemical Bonding - Ionic Bonds',
  '4.2.1',
  'Foundation',
  ARRAY[
    'Explain how ionic bonds are formed',
    'Describe the properties of ionic compounds',
    'Draw dot and cross diagrams for ionic compounds'
  ],
  E'# Ionic Bonding\n\nIonic bonds form when atoms **transfer electrons** to achieve a full outer shell.\n\n## Formation\n1. Metal atoms **lose electrons** to form positive ions (cations)\n2. Non-metal atoms **gain electrons** to form negative ions (anions)\n3. Oppositely charged ions **attract** each other\n\n## Properties of Ionic Compounds\n- High melting and boiling points\n- Conduct electricity when molten or dissolved (but not when solid)\n- Often soluble in water\n- Form crystalline structures\n\n## Example: Sodium Chloride (NaCl)\n- Sodium loses 1 electron → Na⁺\n- Chlorine gains 1 electron → Cl⁻\n- Strong electrostatic forces hold the ions together',
  ARRAY['ionic bond', 'transfer', 'electrons', 'ions', 'cations', 'anions', 'metal', 'non-metal', 'electrostatic', 'crystalline']
),
(
  'Rates of Reaction',
  '4.6.1',
  'Higher',
  ARRAY[
    'Calculate mean rate of reaction',
    'Explain how surface area affects rate',
    'Interpret reaction rate graphs'
  ],
  E'# Rates of Reaction\n\nThe rate of a chemical reaction measures how fast reactants are converted to products.\n\n## Factors Affecting Rate\n1. **Temperature** - Higher temperature increases rate\n2. **Concentration** - Higher concentration increases rate\n3. **Surface Area** - Larger surface area increases rate\n4. **Catalyst** - Speeds up reaction without being used up\n\n## Calculating Rate\nRate = Amount of reactant used or product formed / Time\n\n## Collision Theory\nReactions occur when particles collide with sufficient energy (activation energy). Increasing temperature, concentration, or surface area increases:\n- Frequency of collisions\n- Energy of collisions\n\nThis explains why these factors increase reaction rate.',
  ARRAY['rate of reaction', 'temperature', 'concentration', 'surface area', 'catalyst', 'collision theory', 'activation energy', 'particles']
);