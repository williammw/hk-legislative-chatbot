import React, { useState, useEffect, useRef } from 'react';
import { fetchGPT4Response, fetchLatestLegCoData } from '../api';
import './Chatbot.css';
function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [legCoContext, setLegCoContext] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

 useEffect(() => {
  const fetchData = async () => {
    const context = await fetchLatestLegCoData();
    setLegCoContext(context);
  };

  fetchData();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    const response = await fetchGPT4Response(input, legCoContext);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response, sender: 'ai' },
    ]);
  };

  const inputWordCount = input.split('').length;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-full sm:max-w-6xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-4 md:mx-auto shadow rounded-3xl sm:p-10 w-full sm:w-11/12 lg:w-4/5 xl:w-3/4 2xl:w-2/3">
          <div className="max-w-md mx-auto">
            <div className="overflow-y-auto h-64">
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
                    className={`p-2 rounded-md mb-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-300 rounded-md p-2 mt-4"
                  rows="3"
                  maxLength="4096"
                />
                <div className="absolute bottom-0 right-0 mr-2 mb-1 text-sm text-gray-600">
                  {inputWordCount}
                </div>
              </div>
              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;