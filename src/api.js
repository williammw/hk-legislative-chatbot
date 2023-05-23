
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: `${promptDescription[language]}${legCoContext}`},
        {role: "user", content: prompt}
      ],
      max_tokens: 1000,
    });

    return completion.data.choices[0].message.content;
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




export async function fetchLegCoSchedule() {
  const response = await fetch('https://www.legco.gov.hk/xml/schedule.xml');
  const xmlData = await response.text();
  
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "text/xml");
  
  const scheduleData = extractScheduleInfo(xmlDoc);

  return scheduleData;
}

function extractScheduleInfo(xmlDoc) {
  const detailSchedules = xmlDoc.getElementsByTagName('DetailSchedule');
  const scheduleInfoArray = [];

  for (let i = 0; i < detailSchedules.length; i++) {
    const scheduleNode = detailSchedules[i];

    const id = scheduleNode.getElementsByTagName('ID')[0]?.textContent;
    const date = scheduleNode.getElementsByTagName('Date')[0]?.textContent;
    const time = scheduleNode.getElementsByTagName('Time')[0]?.textContent;
    const venueEN = scheduleNode.getElementsByTagName('EN')[0]?.textContent;
    const venueCH = scheduleNode.getElementsByTagName('CH')[0]?.textContent;
    const subjectEN = scheduleNode.getElementsByTagName('EN')[1]?.textContent;
    const subjectCH = scheduleNode.getElementsByTagName('CH')[1]?.textContent;
    const enUrl = scheduleNode.getElementsByTagName('En_Url')[0]?.textContent;
    const chUrl = scheduleNode.getElementsByTagName('Ch_Url')[0]?.textContent;

    const scheduleInfo = {
      id, date, time, venueEN, venueCH, subjectEN, subjectCH, enUrl, chUrl
    };

    scheduleInfoArray.push(scheduleInfo);
    
  }
  console.log(scheduleInfoArray)
  return scheduleInfoArray;
}
