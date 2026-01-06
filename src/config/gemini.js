// filepath: /Users/lord/Desktop/Data Analytics/Vision/src/config/gemini.js

// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY, });
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function runChat(prompt) {
//   const chatSession = model.startChat({
//       generationConfig,
//       history: [],
//   });

//   const result = await chatSession.sendMessage(prompt);
//   console.log(result.response.text());
//   return result.response.text();
// }

// export default runChat;

import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Vite environment variable
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

async function runChat(prompt) {
  if (!prompt) throw new Error("Prompt is required");

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export default runChat;

