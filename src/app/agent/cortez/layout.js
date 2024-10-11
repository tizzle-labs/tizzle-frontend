import { SpeechProvider } from '@tizzle-fe/hooks/useSpeech';

export default function CortezLayout({ children }) {
  return (
    <SpeechProvider>
      <section>{children}</section>
    </SpeechProvider>
  );
}
