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

  const handleSend = (event) => {
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

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "ありがとうございます。AI が回答を生成中です...",
      };
      setMessages((current) => [...current, assistantMessage]);
    }, 500);
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
            />
            <button className="button" type="submit">
              送信
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
