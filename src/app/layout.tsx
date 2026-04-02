import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AutoPick — Подбор автомобилей',
  description: 'Быстрый и удобный подбор автомобилей по вашим параметрам',
  icons: { icon: '/car-icon.svg' },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="ru">
      <body className="bg-zinc-50 antialiased">{children}</body>
      </html>
  );
}