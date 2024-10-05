import './globals.css';
import Header from '@tizzle-fe/components/Header';

export const metadata = {
  title: 'Tizzle',
  description: 'Personalized AI Agent',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
