import 'regenerator-runtime';

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  List,
  ListItem,
  Flex,
  Select,
  Container,
  Stack,
  Text,
  Input,
  Checkbox,
  Button,
} from '@chakra-ui/react';

const VoiceRecognition = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <Text>Browser doesn't support speech recognition.</Text>;
  }

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Button onClick={startListening}>Start Listening</Button>
      <Button onClick={stopListening}>Stop Listening</Button>
      <Button onClick={resetTranscript}>Reset</Button>
      <Text>Microphone: {listening ? 'on' : 'off'}</Text>
      <Text>{transcript}</Text>
    </Flex>
  );
};

export default VoiceRecognition;
