"use client";

import { useState } from "react";

const languages = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "ko", label: "한국어" },
  { code: "zh", label: "中文" },
  { code: "pt", label: "Português" },
];

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("ja");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInputValue("");
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: trimmed,
          language: selectedLanguage,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "API request failed.");
      }

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: result.completion,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const message = error?.message || "回答の取得中にエラーが発生しました。";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <header className="header">
          <p className="header__title">チャットボット窓口</p>
          <h1 className="header__heading">言語を選択して質問を送信してください</h1>
        </header>

        <section className="panel">
          <div className="language-select">
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                className={`language-button ${
                  selectedLanguage === language.code ? "language-button--active" : ""
                }`}
                onClick={() => setSelectedLanguage(language.code)}>
                {language.label}
              </button>
            ))}
          </div>

          <div className="chat-window">
            {messages.length === 0 ? (
              <p className="chat-window__empty">会話履歴がここに表示されます。</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message chat-message--${message.role}`}>
                  <div className="chat-message__bubble">
                    <p>{message.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <form className="chat-form" onSubmit={handleSend}>
            <input
              className="chat-input"
              type="text"
              placeholder="質問を入力してください..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              disabled={isLoading}
            />
            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? "送信中..." : "送信"}
            </button>
          </form>

          {errorMessage ? <p className="error-text">{errorMessage}</p> : null}
        </section>
      </div>
    </main>
  );
}
