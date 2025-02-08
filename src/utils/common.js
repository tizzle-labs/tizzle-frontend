import { FaInfoCircle, FaQuestionCircle, FaRobot, FaSun } from 'react-icons/fa';

export const envPreset = agentPath => {
  switch (agentPath) {
    case 'cortez':
      return 'studio';
    case 'akira':
      return 'sunset';
    case 'bale':
      return 'sunset';
    default:
      return 'apartment';
  }
};

export const agentSuggentions = agentName => {
  switch (agentName) {
    case 'cortez':
      return [
        {
          text: 'How do I start using or accessing the tizzle platform?',
          icon: <FaQuestionCircle />,
        },
        { text: 'Tell me a fun fact.', icon: <FaInfoCircle /> },
        { text: "How's the weather today?", icon: <FaSun /> },
        { text: 'Why were you created as a cyborg?', icon: <FaRobot /> },
      ];
    case 'akira':
      return [
        {
          text: 'Why are you so excited?',
          icon: <FaQuestionCircle />,
        },
        { text: 'Tell me the history of mount Fuji.', icon: <FaInfoCircle /> },
        { text: 'What is the purpose of Tizzle Labs?', icon: <FaSun /> },
        { text: 'Why did you become a shinobi?', icon: <FaRobot /> },
      ];
    case 'bale':
      return [
        {
          text: 'Can you tell me where you are from?',
          icon: <FaQuestionCircle />,
        },
        { text: 'Give me a riddle.', icon: <FaInfoCircle /> },
        { text: 'Why do you work at Tizzle?', icon: <FaSun /> },
        { text: 'Give me a guess.', icon: <FaRobot /> },
      ];
    case 'jordan':
      return [
        {
          text: "Bro, I'm stressed out. My portfolio is red. Is this the end of crypto as we know it?",
          icon: <FaQuestionCircle />,
        },
        {
          text: "Dude, Bitcoin just dropped 10%! I'm freaking out!",
          icon: <FaInfoCircle />,
        },
        { text: 'Broh, meme coin are crazy', icon: <FaSun /> },
        {
          text: "I think I'm gonna sell all my crypto. This market is too stressful",
          icon: <FaRobot />,
        },
      ];
    default:
      return [];
  }
};

export const prettyTruncate = (amount, decimals = 2) => {
  if (!amount) return '0.00';
  const truncated = parseFloat(amount).toFixed(decimals);
  return truncated;
};

export const truncateAddress = address => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
