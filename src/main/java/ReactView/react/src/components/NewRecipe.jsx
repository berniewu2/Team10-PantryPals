import { Text, Flex, Container, Stack, Button } from '@chakra-ui/react';

function NewRecipe(props) {
  const { onNavigate , recipe} = props;
  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Container maxWidth='700px'>
        
        {recipe ? 
          <Stack spacing={2}>
            <Text align='center' fontSize='20px' fontWeight={600}>
                Title:  {recipe['title']}
            </Text>
            <Text align='center' fontSize='20px' fontWeight={600}>
              Ingredients: {recipe['ingredient']}
            </Text>
            <Text align='center' fontSize='20px' fontWeight={600}>
              Instruction: {recipe['instruction']}
            </Text>
          </Stack>
          : 
          <Stack spacing={2}>
            <Text align='center' fontSize='20px' fontWeight={600}>
              Generating Recipe...
            </Text>
          </Stack>
        }
      </Container>
    </Flex>
  );
}

export default NewRecipe; 