"use client";

import { useState } from "react";

export default function AuthPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token.trim()) {
      setError("アクセスキーを入力してください。");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token.trim() }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "アクセスキーが無効です。");
      }

      window.location.href = "/";
    } catch (err) {
      setError(err?.message || "アクセスキーの検証に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <section className="panel">
          <h1 className="header__heading">アクセス制限</h1>
          <p>限定公開リンクを利用するには、アクセスキーを入力してください。</p>
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              className="chat-input"
              type="text"
              placeholder="アクセスキーを入力"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              disabled={isLoading}
            />
            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? "確認中..." : "送信"}
            </button>
          </form>
          {error ? <p className="error-text">{error}</p> : null}
        </section>
      </div>
    </main>
  );
}
