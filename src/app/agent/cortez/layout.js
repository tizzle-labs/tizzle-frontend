import { SpeechProvider } from '@tizzle-fe/hooks/useSpeech';
import { UserProvider } from '@tizzle-fe/hooks/useUser';
import { WalletProvider } from '@tizzle-fe/hooks/walletContext';

export default function CortezLayout({ children }) {
  return (
    <UserProvider>
      <SpeechProvider>
        <WalletProvider>
          <section>{children}</section>
        </WalletProvider>
      </SpeechProvider>
    </UserProvider>
  );
}
