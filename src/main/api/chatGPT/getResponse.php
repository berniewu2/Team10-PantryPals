<?php   

    $API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
    $API_KEY;
    $MODEL = "gpt-3.5-turbo";
    $MAXTOKENS = 400;

    $mealType = "dinner";
    $ingredients = "tomatoes, onions, waygu beef";

    $message = array ();

    $systemMessage = array (
        "role" => "system",
        "content" => "You are a helpful assistant."
    );

    array_push($message, $systemMessage);

    $userMessage = array (
        "role" => "user",
        "content" => "Imagine you're a chef and you've been asked to create a unique '" .  $mealType . "' recipe. The ingredients you have to work with are '" . $ingredients . "'. Your task is to come up with a recipe that incorporates some of these ingredients but not necessarily  all. \n" . //
                "\n" . //
                "The format of the recipe should be as follows:\n" . //
                "\n" . //
                "1. Start with the name of the recipe. This should be a short catchy and descriptive title that gives a sense of what the final dish will be like. This should be the first line of your response.\n" . //
                "\n" . //
                "2. Next, list out all the ingredients required for the recipe. For each ingredient, specify the amount needed. Each ingredient should be on a new line.\n" . //
                "\n" . //
                "3. After listing the ingredients, provide a step-by-step guide on how to prepare and cook the meal. Each step should be numbered and start on a new line. Be as detailed as possible, explaining each process clearly.\n" . //
                "\n" . //
                "Here's an example of how your recipe should be formatted:\n" . //
                "\n" . //
                "Chicken Stir-Fry\n" . //
                "\n" . //
                "- 1 lb of chicken\n" . //
                "- 2 bell peppers\n" . //
                "- 1 onion\n" . //
                "- 2 tomatoes\n" . //
                "\n" . //
                "1. Cut the chicken and vegetables into bite-sized pieces.\n" . //
                "2. Heat oil in a pan and add the chicken. Cook until no longer pink.\n" . //
                "3. Add the vegetables and stir-fry until tender.\n" . //
                "4. Serve hot with rice.\n" . //
                "\n" . //
                "Remember, you can only use the listed ingredients and the response should contain only the recipe and it should strictly follow this format. it should not include any explanation after the last step.\n Do not use any Box-drawing characters or other illustrative characters as they are not able to be understood."
    );

    array_push($message, $userMessage);
    
    $requestBody = array (
        "model" => $MODEL,
        "messages" => $message,
        "max_tokens" => $MAXTOKENS,
        "temperature" => 1.0
    );

    $request = array(
        'http' => array(
            'method' => 'POST',
            'header' => array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $API_KEY
            ),
            'content' => json_encode($requestBody)
        )
    );

    $context = stream_context_create($request);
    $response = file_get_contents($API_ENDPOINT, false, $context);

    echo $response;
?>