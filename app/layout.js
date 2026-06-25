import './globals.css';

export const metadata = {
  title: "チャットボット窓口",
  description: "Lesson 1-2: チャットボット窓口画面のトップページ"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
