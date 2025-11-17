/*
  # Fitness AI Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `fitness_data`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `height` (numeric, in cm)
      - `weight` (numeric, in kg)
      - `age` (integer)
      - `bmi` (numeric)
      - `created_at` (timestamptz)
    
    - `chat_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `message` (text)
      - `response` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
    - Authenticated users can create and read their own records
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS fitness_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  height numeric NOT NULL,
  weight numeric NOT NULL,
  age integer NOT NULL,
  bmi numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE fitness_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own fitness data"
  ON fitness_data FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own fitness data"
  ON fitness_data FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own fitness data"
  ON fitness_data FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own fitness data"
  ON fitness_data FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  response text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat history"
  ON chat_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat history"
  ON chat_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat history"
  ON chat_history FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);