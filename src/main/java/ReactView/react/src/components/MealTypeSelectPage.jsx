import { Text, Flex, Container, Stack, Button } from '@chakra-ui/react';

function MealTypeSelectScreen(props) {
  const { onNavigate, set_meal_type } = props;
  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Container maxWidth='300px'>
        <Stack spacing={2}>
          <Text align='center' fontSize='20px' fontWeight={600}>
            Select Meal Type
          </Text>
          <Button
            colorScheme='yellow'
            size='sm'
            onClick={() => {
              set_meal_type('Breakfast')
              onNavigate('VoiceRecognition')
            }}>
            Breakfast
          </Button>
          <Button
            colorScheme='green'
            size='sm'
            onClick={() => {
              set_meal_type('Lunch')
              onNavigate('VoiceRecognition')
            }}>
            Lunch
          </Button>
          <Button
            colorScheme='blue'
            size='sm'
            onClick={() => {
              set_meal_type('Dinner')
              onNavigate('VoiceRecognition')
            }}>
            Dinner
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
}

export default MealTypeSelectScreen;
