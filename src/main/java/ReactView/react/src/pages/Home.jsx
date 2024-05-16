import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, HStack, Flex, Button } from '@chakra-ui/react';
import WelcomePage from '../components/WelcomePage';
import VoiceRecognition from '../voiceRecognition';
import Sidebar from '../components/Sidebar';

const basepath = import.meta.env.BASE_URL;

function HomePage() {
  const [recording, setRecording] = useState(false);

  const [currentPage, setCurrentPage] = useState('WelcomePage');
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [login, setLogin] = useState(['', '']);
  const navigate = useNavigate();

  function handleLogoutClick() {
    navigate(basepath);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
  };

  return (
    <Flex width='100vw' height='100vh' align='center' justify='center'>
      <Button
        p={2}
        position='absolute'
        top='15px'
        right='15px'
        size='sm'
        colorScheme='blue'
        onClick={handleLogoutClick}>
        Logout
      </Button>
      <HStack width='full' height='full' spacing={0}>
        <Flex minWidth='300px' height='full' p={4} padding='16px 0px 16px 16px'>
          <Sidebar />
        </Flex>
        <Box width='100%' height='full' padding='16px 16px 16px 0px'>
          <WelcomePage />
          {/* <VoiceRecognition></VoiceRecognition> */}
        </Box>
      </HStack>
    </Flex>
  );
}

export default HomePage;
