import type { Metadata } from 'next';
import './globals.css';
import {Toaster} from "react-hot-toast";

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
      <body className="bg-zinc-50 antialiased">
      {children}
      <Toaster
          position="top-center"
          toastOptions={{
              duration: 4000,
              style: {
                  background: '#18181b',
                  color: '#fff',
                  borderRadius: '16px',
                  padding: '16px 20px',
              },
          }}
      />



      </body>
      </html>
  );
}