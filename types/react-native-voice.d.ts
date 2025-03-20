declare module 'react-native-voice' {
    export function start(language: string): Promise<void>;
    export function stop(): Promise<void>;
    export function cancel(): Promise<void>;
    export function onSpeechResults(callback: (event: { value: string[] }) => void): void;
    // Add other methods and events as needed
  }