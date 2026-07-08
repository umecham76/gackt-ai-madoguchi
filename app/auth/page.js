"use client";

import { useState } from "react";

export default function AuthPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("access_token", token);
    window.location.href = url.toString();
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
            />
            <button className="button" type="submit">
              送信
            </button>
          </form>
          {error ? <p className="error-text">{error}</p> : null}
        </section>
      </div>
    </main>
  );
}
