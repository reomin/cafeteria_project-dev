import Link from 'next/link';

export const metadata = {
  title: 'Cafeteria_database',
  description: 'Generated by create next app',
  themeColor: '#ffffff',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja">
      <head />
      <body>
        {/* headerをコンポーネント化する */}
        <header>
          <h1>
            <Link href="/">ブログ</Link>
          </h1>
          <Link href="/articles/new">記事を書く</Link>
        </header>
        {children}
        {/* フッターをコンポーネントにする */}
        <footer>
          <small>© 2023 azukiazusa</small>
        </footer>
      </body>
    </html>
  );
}
