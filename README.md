# AI Powered Fitness App

This is a React and Vite-based web application that provides personalized fitness and diet plans using AI. It integrates with Supabase for the database and Groq for the AI chat functionality.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Prajwal-banakar/Ai-powered-Fitness
    cd Ai-powered-Fitness
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of your project and add the following, replacing the placeholder values with your actual keys:

    ```
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
    VITE_GROQ_API_KEY=your-groq-api-key
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the development server, and you can view the app at `http://localhost:5173`.

## Building for Production

To create a production-ready build, run the following command:

```bash
npm run build
```

This will generate a `dist` folder in your project root, which contains the optimized and minified static files for your application.

## Deployment

You can deploy this project to any static hosting service. Here are instructions for two popular free options:

### Deploying to Netlify

1.  **Sign up for a Netlify account:** Go to [Netlify](https://www.netlify.com/) and sign up for a free account.
2.  **Create a new site:** From your Netlify dashboard, click "New site from Git."
3.  **Connect your Git provider:** Choose your Git provider (e.g., GitHub, GitLab, Bitbucket) and authorize Netlify to access your repositories.
4.  **Select your repository:** Choose the repository for this project.
5.  **Configure build settings:**
    -   **Build command:** `npm run build`
    -   **Publish directory:** `dist`
6.  **Add environment variables:** Before deploying, go to "Site settings" > "Build & deploy" > "Environment" and add the same environment variables you set up in your `.env` file:
    -   `VITE_SUPABASE_URL`
    -   `VITE_SUPABASE_ANON_KEY`
    -   `VITE_GROQ_API_KEY`
7.  **Deploy site:** Click "Deploy site" to start the build and deployment process. Netlify will provide you with a live URL once it's complete.

### Deploying to Vercel

1.  **Sign up for a Vercel account:** Go to [Vercel](https://vercel.com/) and sign up for a free account.
2.  **Create a new project:** From your Vercel dashboard, click "Add New..." > "Project."
3.  **Import your Git repository:** Select your Git provider and import the repository for this project.
4.  **Configure your project:** Vercel will automatically detect that you're using Vite and configure the build settings for you.
5.  **Add environment variables:** Before deploying, go to the "Settings" tab, then "Environment Variables," and add the same variables you set up in your `.env` file:
    -   `VITE_SUPABASE_URL`
    -   `VITE_SUPABASE_ANON_KEY`
    -   `VITE_GROQ_API_KEY`
6.  **Deploy:** Click "Deploy" to start the build and deployment process. Vercel will provide you with a live URL once it's complete.
