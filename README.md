# Fitness AI

Fitness AI is a modern, all-in-one web application designed to be your personal fitness assistant. It provides users with personalized health data, AI-driven advice, and motivational tools to help them achieve their fitness goals.

## Key Features

- **User Authentication**: Secure sign-up and login functionality using Supabase.
- **BMI Calculator**: Users can calculate their Body Mass Index (BMI) by providing their height, weight, and age.
- **Personalized Plans**: Automatically generates downloadable PDF diet and workout plans based on the user's fitness data.
- **AI Chatbot**: A powerful, integrated chatbot powered by Groq that can answer a wide range of questions on any topic.
- **Inspirational Content**: A beautiful section displaying motivational fitness quotes and images to keep users inspired.
- **Find Nearby Gyms**: A convenient link that opens Google Maps to show gyms near the user's location.
- **Find Nearby Yoga Classes**: A convenient link that opens Google Maps to show yoga classes near the user's location.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend-as-a-Service (BaaS)**: Supabase
  - **Authentication**: Supabase Auth
  - **Database**: Supabase (PostgreSQL)
- **AI**: Groq (Llama 3 Model)
- **Icons**: Lucide React

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/)

### 1. Clone the Repository

```sh
git clone <your-repository-url>
cd project
```

### 2. Install Dependencies

Install the required npm packages.

```sh
npm install
```

### 3. Set Up Environment Variables

This project requires API keys from Supabase and Groq to function correctly.

1.  Create a new file named `.env` in the root of the project directory.
2.  Copy the contents of `.env.example` (if it exists) or add the following variables to the new `.env` file:

```env
# Get these from your Supabase project -> Settings -> API
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Get this from your Groq account -> API Keys
VITE_GROQ_API_KEY=YOUR_GROQ_API_KEY
```

### 4. Set Up the Supabase Database

Your Supabase project needs the correct database schema to store user data.

1.  **Create a new project** on [supabase.com](https://supabase.com/).
2.  Navigate to the **SQL Editor**.
3.  Copy the entire SQL script from `supabase/migrations/20251117044418_create_fitness_tables.sql` and run it to create the necessary tables (`profiles`, `fitness_data`, `chat_history`) and policies.
4.  **Disable Email Confirmation**: For a smoother user experience during development, go to **Authentication** -> **Providers** -> **Email** and turn **OFF** the "Confirm email" toggle.
5.  **Set up the Database Trigger**: Go to the **SQL Editor** and run the trigger script from `supabase/migrations/20251117044418_create_fitness_tables.sql` again, but this time only the `handle_new_user` function and the trigger creation part. This will automatically create a user profile on sign up.

### 5. Run the Development Server

Once the setup is complete, you can start the application.

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.
