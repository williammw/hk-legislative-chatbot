const openai = require('./openai');

export async function fetchLatestLegCoData() {
  const response = await fetch('https://app4.legco.gov.hk/mapi/tc/api/LASS/getListMember');
  const data = await response.json();
  const members = data.data.map(member => member.salute_name).join(', ');
  console.log(members, data.data.length);
  const totalMembers = data.data.length;
  return `There are ${totalMembers} members in the Legislative Council of the Hong Kong Special Administrative Region. The current members include: ${members}`;
}



export async function fetchGPT4Response(prompt, legCoContext) {
  const language = prompt.match(/[\u4e00-\u9fff]/) ? 'zh' : 'en';

  const promptDescription = {
    en: `The following is a conversation with an AI assistant specifically designed to provide information about the Legislative Council of the Hong Kong Special Administrative Region. The assistant is knowledgeable, helpful, and can communicate in both English and Chinese.\n\n`,
    zh: `以下是與一個專門為香港特別行政區立法會提供信息的AI助手的對話。該助手知識淵博，樂於助人，能夠用英文和中文溝通。\n\n`,
  };

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${promptDescription[language]}${legCoContext}\n\nUser: ${prompt}`,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ["\nUser:"],
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


