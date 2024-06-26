import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Container,
  Stack,
  Text,
  Input,
  Checkbox,
  Button,
} from '@chakra-ui/react';

import { AccountManager } from '../api/AccountManager.js';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(['', '']);
  const navigate = useNavigate();

  async function handleLoginClick(e) {
    handleSubmit(e);
    try {
      const result = await AccountManager({ method: 'verify', username:username, password:password});

      if (result == '\"1\"') {
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async function handleCreateAccountClick(e) {
    handleSubmit(e);
    try {
      const result = await AccountManager({ method: 'addUser', username:username, password:password});

      if (result != '\"-1\"') {
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
  };

  return (
    <Flex width='100vw' height='100vh' align='center' justify='center'>
      <Container style={{ maxWidth: '300px' }}>
        <Stack spacing={2}>
          <Text align='center' fontSize='20px' fontWeight={600}>
            Welcome to Pantry Pals!
          </Text>
          <Input
            variant='filled'
            placeholder='Username'
            size='sm'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            variant='filled'
            placeholder='Password'
            size='sm'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack direction='row' justify='center'>
            <Button
              flex='3'
              size='sm'
              colorScheme='blue'
              isDisabled={!username || !password}
              onClick={handleLoginClick}>
              Login
            </Button>
            <Button
              flex='5'
              size='sm'
              colorScheme='green'
              isDisabled={!username || !password}
              onClick={handleCreateAccountClick}>
              Create Account
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}

export default LoginPage;
