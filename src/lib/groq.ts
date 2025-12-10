import Groq from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

let groq = null;
let groqInitializationError = null;

if (!apiKey) {
  groqInitializationError = 'VITE_GROQ_API_KEY is not set in your .env file. Please add it and restart the server.';
} else {
  try {
    groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });
  } catch (e) {
    console.error("Error initializing Groq:", e);
    groqInitializationError = "Failed to initialize Groq. The API key might be invalid.";
  }
}

export { groq, groqInitializationError };
