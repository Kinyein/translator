import express from "express";
import cors from "cors";
import * as deepl from "deepl-node";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const deeplClient = new deepl.DeepLClient(process.env.DEEPL_API_KEY)
let cachedLanguages = null;
// let cachedLanguages = [
//     {
//         "language": "AR",
//         "name": "Arabic",
//         "supports_formality": false
//     },
//     {
//         "language": "BG",
//         "name": "Bulgarian",
//         "supports_formality": false
//     },
//     {
//         "language": "CS",
//         "name": "Czech",
//         "supports_formality": false
//     },
//     {
//         "language": "DA",
//         "name": "Danish",
//         "supports_formality": false
//     },
//     {
//         "language": "DE",
//         "name": "German",
//         "supports_formality": true
//     },
//     {
//         "language": "EL",
//         "name": "Greek",
//         "supports_formality": false
//     },
//     {
//         "language": "EN-GB",
//         "name": "English (British)",
//         "supports_formality": false
//     },
//     {
//         "language": "EN-US",
//         "name": "English (American)",
//         "supports_formality": false
//     },
//     {
//         "language": "ES",
//         "name": "Spanish",
//         "supports_formality": true
//     },
//     {
//         "language": "ET",
//         "name": "Estonian",
//         "supports_formality": false
//     },
//     {
//         "language": "FI",
//         "name": "Finnish",
//         "supports_formality": false
//     },
//     {
//         "language": "FR",
//         "name": "French",
//         "supports_formality": true
//     },
//     {
//         "language": "HU",
//         "name": "Hungarian",
//         "supports_formality": false
//     },
//     {
//         "language": "ID",
//         "name": "Indonesian",
//         "supports_formality": false
//     },
//     {
//         "language": "IT",
//         "name": "Italian",
//         "supports_formality": true
//     },
//     {
//         "language": "JA",
//         "name": "Japanese",
//         "supports_formality": true
//     },
//     {
//         "language": "KO",
//         "name": "Korean",
//         "supports_formality": false
//     },
//     {
//         "language": "LT",
//         "name": "Lithuanian",
//         "supports_formality": false
//     },
//     {
//         "language": "LV",
//         "name": "Latvian",
//         "supports_formality": false
//     },
//     {
//         "language": "NB",
//         "name": "Norwegian",
//         "supports_formality": false
//     },
//     {
//         "language": "NL",
//         "name": "Dutch",
//         "supports_formality": true
//     },
//     {
//         "language": "PL",
//         "name": "Polish",
//         "supports_formality": true
//     },
//     {
//         "language": "PT-BR",
//         "name": "Portuguese (Brazilian)",
//         "supports_formality": true
//     },
//     {
//         "language": "PT-PT",
//         "name": "Portuguese (European)",
//         "supports_formality": true
//     },
//     {
//         "language": "RO",
//         "name": "Romanian",
//         "supports_formality": false
//     },
//     {
//         "language": "RU",
//         "name": "Russian",
//         "supports_formality": true
//     },
//     {
//         "language": "SK",
//         "name": "Slovak",
//         "supports_formality": false
//     },
//     {
//         "language": "SL",
//         "name": "Slovenian",
//         "supports_formality": false
//     },
//     {
//         "language": "SV",
//         "name": "Swedish",
//         "supports_formality": false
//     },
//     {
//         "language": "TR",
//         "name": "Turkish",
//         "supports_formality": false
//     },
//     {
//         "language": "UK",
//         "name": "Ukrainian",
//         "supports_formality": false
//     },
//     {
//         "language": "ZH",
//         "name": "Chinese (simplified)",
//         "supports_formality": false
//     },
//     {
//         "language": "ZH-HANS",
//         "name": "Chinese (simplified)",
//         "supports_formality": false
//     },
//     {
//         "language": "ZH-HANT",
//         "name": "Chinese (traditional)",
//         "supports_formality": false
//     }
// ]

app.get("/languages", async (_, res) => {
  try {
    if (!cachedLanguages) {
      const res = await fetch('https://api-free.deepl.com/v2/languages?in=query&type=target', {
        method: "GET",
        headers: {
          "Authorization": `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`
        }
      });
      const languages = await res.json();
      cachedLanguages = languages;
    }
    res.json({sourceLanguages: cachedLanguages});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load languages" });
  }
})

app.post("/translate", async (req, res) => {
  try {
    const { fromText, fromLanguage, toLanguage } = req.body;

    if (!fromText || !toLanguage) {
      return res.status(400).json({ error: "Missing text or a language option to translte" });
    }

    const sourceLanguage = fromLanguage === 'auto' || !fromLanguage ? null : fromLanguage

    const result = await deeplClient.translateText(fromText, sourceLanguage, toLanguage);
    res.json({ translation: result.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Translation failed because: ${err}` });
  }
});

app.listen(app.get("port"), () => console.log(`✅ Server running on http://localhost/${app.get("port")}`));
