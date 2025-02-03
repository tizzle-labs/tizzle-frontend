import './globals.css';
import { Kanit } from 'next/font/google';
import { WalletProvider } from '@tizzle-fe/hooks/walletContext';
import { UserProvider } from '@tizzle-fe/hooks/useUser';

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
        <main>
          <UserProvider>
            <WalletProvider>{children}</WalletProvider>
          </UserProvider>
        </main>
      </body>
    </html>
  );
}
