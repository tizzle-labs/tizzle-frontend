import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCopy,
  FaInfoCircle,
  FaQuestionCircle,
  FaRobot,
  FaSun,
} from 'react-icons/fa';

const suggestions = [
  {
    text: 'How do I start using or accessing the tizzle platform?',
    icon: <FaQuestionCircle />,
  },
  { text: 'Tell me a fun fact.', icon: <FaInfoCircle /> },
  { text: "How's the weather today?", icon: <FaSun /> },
  { text: 'Why were you created as a cyborg?', icon: <FaRobot /> },
];

const ChatInterface = ({
  agentPath,
  messages: incomingMessages,
  loading: loading,
  sendSuggestMessage,
}) => {
  const [messages, setMessages] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [copyStatus, setCopyStatus] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (incomingMessages && incomingMessages.length > 0) {
      setMessages(prevMessages => [
        ...prevMessages,
        ...incomingMessages
          .filter(
            msg => !prevMessages.some(prevMsg => prevMsg.text === msg.text),
          )
          .map(msg => ({
            text: msg.text,
            isUser: msg.isUser === true ? true : false,
          })),
      ]);
    }
  }, [incomingMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages, isMinimized]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuggestionClick = suggestion => {
    sendSuggestMessage(suggestion.text);
    setShowSuggestions(false);
  };

  const handleCopyAgentResponse = (agentMessages, groupIdx) => {
    const allAgentText = agentMessages.map(msg => msg.text).join('\n');
    navigator.clipboard.writeText(allAgentText);
    setCopyStatus(groupIdx);
    setTimeout(() => setCopyStatus(null), 1000);
  };

  const groupMessagesByResponse = () => {
    const groupedResponses = [];
    let currentResponse = [];

    messages.forEach((message, idx) => {
      if (message.isUser) {
        if (currentResponse.length > 0) {
          groupedResponses.push(currentResponse);
          currentResponse = [];
        }
        groupedResponses.push([message]);
      } else {
        currentResponse.push(message);
      }
    });

    if (currentResponse.length > 0) {
      groupedResponses.push(currentResponse);
    }

    return groupedResponses;
  };

  const groupedMessages = groupMessagesByResponse();

  return (
    <>
      {isMinimized && (
        <button
          className="absolute right-0 top-4 bg-white text-black px-4 py-2 rounded-l-lg flex items-center hover:bg-primary transition"
          onClick={() => setIsMinimized(false)}
        >
          <FaChevronLeft className="mr-2" /> Messages
        </button>
      )}

      {!isMinimized && (
        <div className="self-end absolute w-1/4 h-3/4 backdrop-blur-md bg-white rounded-lg">
          <div className="bg-black text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
            <span>Messages</span>
            <button
              className="hover:bg-primary p-2 rounded-lg transition"
              onClick={() => setIsMinimized(true)}
            >
              <FaChevronRight />
            </button>
          </div>

          <div
            className="flex-grow p-4 overflow-y-auto"
            style={{ maxHeight: 'calc(100% - 80px)' }}
          >
            <div className="space-y-4">
              {showSuggestions && messages.length === 0 && !loading && (
                <>
                  <div className="flex justify-center items-center">
                    <Image
                      src={`/assets/agents/${agentPath}/${agentPath}-half.png`}
                      className={`w-20 h-20 rounded-full object-cover ${agentPath == 'cortez' ? 'bg-cortez-blue' : agentPath == 'akira' ? 'bg-akira-gold' : 'bg-bale-taro'}`}
                      width={80}
                      height={80}
                      alt="Agent Avatar"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {suggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="cursor-pointer p-3 h-32 text-black rounded-lg shadow-lg hover:bg-primary transition"
                      >
                        <p className="mb-4">{suggestion.icon}</p>
                        <p className="text-sm">{suggestion.text}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {groupedMessages.map((group, groupIdx) => (
                <div key={groupIdx}>
                  {group.map((message, idx) => (
                    <div
                      key={idx}
                      className={`flex text-gray-900 ${
                        message.isUser ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.isUser ? (
                        <div className="text-sm p-3 ml-12 rounded-lg shadow bg-primary">
                          {message.text}
                        </div>
                      ) : (
                        <div className="grid grid-cols-12 gap-x-4 justify-start">
                          <div className="col-span-2">
                            {idx === 0 && (
                              <Image
                                src={`/assets/agents/${agentPath}/${agentPath}-half.png`}
                                className={`w-10 h-10 rounded-full object-cover ${agentPath == 'cortez' ? 'bg-cortez-blue' : agentPath == 'akira' ? 'bg-akira-gold' : 'bg-bale-taro'}`}
                                width={80}
                                height={80}
                                alt="Agent Avatar"
                              />
                            )}
                          </div>
                          <div className="col-span-10">
                            <p className="text-sm mb-2">{message.text}</p>
                            {group.length === 1 || group.length - 1 === idx ? (
                              <button
                                id={idx}
                                className="transition text-gray-500 hover:text-black"
                                onClick={() =>
                                  handleCopyAgentResponse(group, groupIdx)
                                }
                              >
                                {copyStatus === groupIdx ? (
                                  <FaCheck size={14} className="inline mr-1" />
                                ) : (
                                  <FaCopy size={14} className="inline mr-1" />
                                )}
                              </button>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-x-4">
                  <div className="col-span-1 flex justify-center items-center">
                    <Image
                      src={`/assets/agents/${agentPath}/${agentPath}-half.png`}
                      className={`w-10 h-10 rounded-full object-cover ${agentPath == 'cortez' ? 'bg-cortez-blue' : agentPath == 'akira' ? 'bg-akira-gold' : 'bg-bale-taro'}`}
                      width={80}
                      height={80}
                      alt="Agent Avatar"
                    />
                  </div>
                  <div className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef}></div>
            </div>
          </div>

          <div className="absolute bottom-0 w-full bg-white border-t-[1px] border-gray-200 p-4 flex justify-center rounded-b-lg">
            <p className="text-[10px] text-center">
              Always double check critical information as agent can make
              mistakes.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatInterface;
