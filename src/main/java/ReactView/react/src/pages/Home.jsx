import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, HStack, Flex, Button } from '@chakra-ui/react';
import WelcomePage from '../components/WelcomePage';
import MealTypeSelectPage from '../components/MealTypeSelectPage';
import VoiceRecognition from '../voiceRecognition';
import Sidebar from '../components/Sidebar';
import NewRecipe from '../components/NewRecipe';
import { ChatGPT } from '../api/ChatGPT';

const basepath = import.meta.env.BASE_URL;

function HomePage() {
  const [recording, setRecording] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [login, setLogin] = useState(['', '']);
  const navigate = useNavigate();
  const [meal_type, set_meal_type] = useState('');
  const [ingredients, set_ingredients] = useState('');
  const [number_of_serving, set_number_of_servering] = useState('');
  const [difficulty, set_difficulty] = useState('');
  const [cook_time, set_cook_time] = useState('');
  const [cuisine, set_cuisine] = useState('');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <WelcomePage onNavigate={navigateTo} />;
      case 'MealTypeSelect':
        return <MealTypeSelectPage onNavigate={navigateTo} set_meal_type={set_meal_type}/>;
      case 'VoiceRecognition':
        return <VoiceRecognition onNavigate={navigateTo} set_ingredients={set_ingredients} />;
      case 'NewRecipe':
        return <NewRecipe onNavigate={navigateTo} recipe={handleRecipeGeneration()} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  function handleLogoutClick() {
    navigate(basepath);
  }

  function handleBackClick() {
    if (currentPage == 'MealTypeSelect') setCurrentPage('home');
    else if (currentPage == 'VoiceRecognition')
      setCurrentPage('MealTypeSelect');
    else if (currentPage == 'NewRecipe')
      setCurrentPage('VoiceRecognition');
  }

  async function handleRecipeGeneration() {
    const result = await ChatGPT({ 
      meal_type: meal_type, 
      ingredients: ingredients, 
      number_of_serving: number_of_serving,
      difficulty: difficulty,
      cook_time: cook_time,
      cuisine: cuisine 
    });
    
    return result;
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
      {currentPage !== 'home' && (
        <Button
          p={2}
          position='absolute'
          bottom='15px'
          right='15px'
          size='sm'
          colorScheme='red'
          onClick={handleBackClick}>
          Back
        </Button>
      )}
      <HStack width='full' height='full' spacing={0}>
        <Flex minWidth='300px' height='full' p={4} padding='16px 0px 16px 16px'>
          <Sidebar />
        </Flex>
        <Box width='100%' height='full' padding='16px 16px 16px 0px'>
          {renderPage()}
          {/* <WelcomePage /> */}
          {/* <VoiceRecognition></VoiceRecognition> */}
        </Box>
      </HStack>
    </Flex>
  );
}

export default HomePage;
