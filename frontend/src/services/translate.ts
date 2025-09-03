import type { TranslateParams } from "../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const availableLanguages = async () => {
  const res = await fetch(`${BACKEND_URL}/languages`);
  const languages = await res.json();
  const { sourceLanguages } = languages
  return sourceLanguages
}

export const translateText = async ({ fromText, fromLanguage, toLanguage }: TranslateParams) => {
  const res = await fetch("http://localhost:4000/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "fromText": fromText,
      "fromLanguage": fromLanguage,
      "toLanguage": toLanguage
    }),
  });

  const data = await res.json();
  return data.translation
}

