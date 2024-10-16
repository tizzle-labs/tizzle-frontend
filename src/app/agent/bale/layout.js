import { SpeechProvider } from '@tizzle-fe/hooks/useSpeech';

export default function BaleLayout({ children }) {
  return (
    <SpeechProvider>
      <section>{children}</section>
    </SpeechProvider>
  );
}
