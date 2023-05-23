import React, { useState, useEffect, useRef } from 'react';
import { fetchGPT4Response, fetchLatestLegCoData, fetchLegCoSchedule } from '../api';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
// import { BeakerIcon } from '@heroicons/react/24/solid'
import './Chatbot.css';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [legCoContext, setLegCoContext] = useState('');
  const [legCoSchedule, setLegCoSchedule] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      const context = await fetchLatestLegCoData();
      const schedule = await fetchLegCoSchedule();
      setLegCoContext(context);
      setLegCoSchedule(schedule);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // We need to check if the user is asking for schedule information before asking the AI
    let response = '';
    if (input.toLowerCase().includes('schedule')) {
      // The user asked for schedule information
      // Let's format the schedule information into a user-readable format before sending it
      response = formatScheduleInfo(legCoSchedule);
    } else {
      // The user didn't ask for schedule information
      // Ask the AI as normal
      response = await fetchGPT4Response(input, legCoContext);
    }
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response, sender: 'ai' },
    ]);
  };

  const formatScheduleInfo = (schedule) => {
  let formattedSchedule = 'Here is the upcoming LegCo meeting schedule:\n';
  
  schedule.forEach((meeting, index) => {
    formattedSchedule += `\nMeeting ${index + 1}: \n\n`;

    if(meeting.date){
      formattedSchedule += `Date: ${meeting.date} \n\n`;
    }

    if(meeting.time){
      formattedSchedule += `Time: ${meeting.time} \n\n`;
    }

    if(meeting.venueEN){
      formattedSchedule += `Venue: ${meeting.venueEN} \n\n`;
    }

    if(meeting.subjectEN){
      formattedSchedule += `Subject: ${meeting.subjectEN} \n\n`;
    }

    if(meeting.enUrl){
      formattedSchedule += `More info: ${meeting.enUrl}\n\n`;
    }
  });
  
  return formattedSchedule;
};




  const inputWordCount = input.split('').length;

    return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="min-w-[600] shadow-2xl bg-white max-w-md mx-auto rounded-xl overflow-hidden z-20 ">
        <div className="h-20 bg-indigo-500 flex items-center justify-between px-5">
          <div className="flex items-center">
            <div className="rounded-full bg-indigo-400 w-10 h-10"></div>
            <div className="ml-3 text-white">LegCo ChatBot</div>
          </div>
        </div>
        <div className="h-96 overflow-y-scroll bg-gray-50 px-5 py-7">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.sender === 'user'
                  ? 'flex justify-end'
                  : 'flex justify-start'
              }`}
            >
              <div
                className={`p-2 rounded-lg mb-2 ${
                  message.sender === 'user'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {message.sender === 'user' ? (
                  message.text
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} />
                )}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="border-t-2 border-indigo-200">
          <div className="flex items-center p-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-300 rounded-md p-2 mr-4"
              rows="1"
              maxLength="4096"
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 rounded-full w-10 h-10 flex items-center justify-center text-white"
            >
              <PaperAirplaneIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;

