import { NextResponse } from "next/server";

const MODEL = process.env.ANTHROPIC_API_MODEL || "claude-3.5-sonic";
const API_URL = "https://api.anthropic.com/v1/chat/completions";

const languageNames = {
  ja: "日本語",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  ko: "한국어",
  zh: "中文",
  pt: "Português",
};

export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Anthropic API key is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { text, language } = body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return NextResponse.json(
      { error: "Request must include a non-empty text field." },
      { status: 400 }
    );
  }

  const languageName = languageNames[language] || language || "the requested language";
  const systemMessage = `You are a helpful assistant. Answer the user's question in ${languageName}. Respond in ${languageName} only.`;

  const payload = {
    model: MODEL,
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: text },
    ],
    temperature: 0.7,
    max_tokens_to_sample: 1000,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.error || "Anthropic API request failed." },
        { status: response.status }
      );
    }

    const textResponse =
      result.completion ||
      result?.choices?.[0]?.message?.content ||
      result?.message ||
      "回答を取得できませんでした。";

    return NextResponse.json({ completion: textResponse });
  } catch (error) {
    return NextResponse.json(
      { error: "Anthropic API request failed." },
      { status: 500 }
    );
  }
}
