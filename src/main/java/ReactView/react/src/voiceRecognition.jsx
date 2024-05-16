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
      <Container maxWidth='300px'>
        <Stack>
          <Stack direction='row' justify='center'>
            <Button size='sm' onClick={startListening}>
              Start Listening
            </Button>
            <Button size='sm' onClick={stopListening}>
              Stop Listening
            </Button>
          </Stack>
          <Button colorScheme='red' size='sm' onClick={resetTranscript}>
            Reset
          </Button>
          <Text align='center' fontSize='14px' fontWeight={600}>
            Microphone: {listening ? 'on' : 'off'}
          </Text>
          <Text align='center' fontSize='14px' fontWeight={600}>
            {transcript}
          </Text>
        </Stack>
      </Container>
    </Flex>
  );
};

export default VoiceRecognition;
