import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';
import axios from 'axios';
import TranslationModal from './TranslationModal';

const App = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const translateText = async () => {
    try {
      const response = await axios.post('https://api.example.com/translate', {
        text: text,
        targetLanguage: 'es', // Change to desired target language
      });
      setTranslatedText(response.data.translatedText);
      Tts.speak(response.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  const startListening = () => {
    Voice.start('en-US'); // Change to desired language
    Voice.onSpeechResults = (event) => {
      setText(event.value[0]);
    };
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type or speak text"
        value={text}
        onChangeText={setText}
      />
      <Button title="Translate" onPress={translateText} />
      <Text style={styles.translatedText}>{translatedText}</Text>
      <Button title="Start Voice Recognition" onPress={startListening} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  translatedText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default App; 