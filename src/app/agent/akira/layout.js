import { SpeechProvider } from '@tizzle-fe/hooks/useSpeech';

export default function AkiraLayout({ children }) {
  return (
    <SpeechProvider>
      <section>{children}</section>
    </SpeechProvider>
  );
}
