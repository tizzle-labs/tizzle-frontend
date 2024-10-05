import './globals.css';
import Navbar from '@tizzle-fe/components/Navbar';

import { Kanit } from 'next/font/google';

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata = {
  title: 'Tizzle',
  description: 'Personalized AI Agent',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
