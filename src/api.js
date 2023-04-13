const openai = require('./openai');

export async function fetchGPT4Response(prompt, language) {
 const context = {
    en: `There are 90 members in the Legislative Council of the Hong Kong Special Administrative Region.`,
    zh: `香港特別行政區立法會有90名成員。 `,
  };

  const promptDescription = {
    en: `The following is a conversation with an AI assistant specifically designed to provide information about the Legislative Council of the Hong Kong Special Administrative Region. The assistant is knowledgeable, helpful, and can communicate in both English and Chinese. ${context[language]}\n\n`,
    zh: `以下是與一個專門為香港特別行政區立法會提供信息的AI助手的對話。該助手知識淵博，樂於助人，能夠用英文和中文溝通。 ${context[language]}\n\n`,
  };

  

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${promptDescription[language]}Human: Hello, who are you?\nAI: I am an AI created by OpenAI specifically to help you with questions related to the Legislative Council of the Hong Kong Special Administrative Region. How can I help you today?\nHuman: ${prompt}\nAI:`,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ["\nHuman:", "\nAI:"],
    });

    return completion.data.choices[0].text.trim();
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    return 'An error occurred while fetching the response.';
  }
}
