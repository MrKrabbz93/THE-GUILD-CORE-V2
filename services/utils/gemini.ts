// src/utils/gemini.ts
import { GoogleGenerativeAI } from '@google/genai';

// This value is automatically replaced in production with your real key
// (thanks to the vite.config.ts + .env.production magic from the previous step)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

if (!API_KEY || API_KEY.includes('PLACEHOLDER') || API_KEY.includes('sk-XXXXXXXXXXXXXXXX')) {
  // Dev mode without key → show a friendly banner instead of crashing
  if (import.meta.env.DEV) {
    console.warn('Gemini API key not set – running in demo/offline mode');
  } else {
    throw new Error('GEMINI_API_KEY is missing in production environment');
  }
}

export const gemini = new GoogleGenerativeAI(API_KEY);

// Optional: pre-warm a lightweight model so first user request is instant
export const geminiFlash = gemini.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
export const geminiPro = gemini.getGenerativeModel({ model: 'gemini-2.0-pro-exp' });
