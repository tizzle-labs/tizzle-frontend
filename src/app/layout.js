import { Kanit } from 'next/font/google';
import { WalletProvider } from '@tizzle-fe/hooks/walletContext';
import { UserProvider } from '@tizzle-fe/hooks/useUser';
import SuiContext from '@tizzle-fe/hooks/suiContext';

import './globals.css';
import '@mysten/dapp-kit/dist/index.css';

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kanit',
  display: 'swap',
});

export const metadata = {
  title: 'Tizzle',
  description: 'Personalized AI Agent',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={kanit.className}>
      <body>
        <main>
          <SuiContext>
            <UserProvider>
              <WalletProvider>{children}</WalletProvider>
            </UserProvider>
          </SuiContext>
        </main>
      </body>
    </html>
  );
}
