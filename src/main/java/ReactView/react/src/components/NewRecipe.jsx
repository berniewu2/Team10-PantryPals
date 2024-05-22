import { Text, Flex, Container, Stack, Button } from '@chakra-ui/react';

function NewRecipe(props) {
  const { onNavigate } = props;
  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Container maxWidth='300px'>
        <Stack spacing={2}>
        <Text align='center' fontSize='20px' fontWeight={600}>
            Generating Recipe...
        </Text>
        </Stack>
      </Container>
    </Flex>
  );
}

export default NewRecipe; 