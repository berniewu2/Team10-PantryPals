import { Flex, Container, Stack, Button } from '@chakra-ui/react';

function WelcomeScreen() {
  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Container maxWidth='300px'>
        <Stack spacing={2}>
          <Button colorScheme='blue' size='sm'>
            Generate New Recipe
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
}

export default WelcomeScreen;
