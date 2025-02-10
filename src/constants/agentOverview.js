import {
  GiAbstract050,
  GiAbstract031,
  GiAbstract030,
  GiAbstract059,
  GiAbstract055,
  GiAbstract116,
} from 'react-icons/gi';

export const SPECIALIZATION_ICON = [
  {
    icon: <GiAbstract050 size={32} />,
  },
  {
    icon: <GiAbstract031 size={32} />,
  },
  {
    icon: <GiAbstract030 size={32} />,
  },
  {
    icon: <GiAbstract059 size={32} />,
  },
  {
    icon: <GiAbstract055 size={32} />,
  },
  {
    icon: <GiAbstract116 size={32} />,
  },
];

const ISAAC_DATA = {
  herobg: '/assets/background/isaacbg.png',
  hero: 'ISAAC: Your\n Blockchain & SUI Expert',
  subhero:
    'Isaac is ideal for developers, entrepreneurs, and anyone interested in \nbuilding blockchain applications, particularly on the Sui network.',
  ideal: 'Blockchain development, Architecture, SUI',
  speciality:
    "Build, debug, and explore the world of blockchain with Cortez's expert guidance, specializing in Sui development and smart contracts.",
  skills: ['Technical', 'Innovative', 'SUI Expert'],
  specialization: [
    {
      title: 'Blockchain Development',
      description:
        'Proficient in various blockchain platforms and development tools',
    },
    {
      title: 'Smart Contracts',
      description: 'Develops and audits secure and efficient smart contracts',
    },
    {
      title: 'SUI',
      description:
        'Deep expertise in the Sui blockchain, including its architecture and network',
    },
  ],
  ctaDesc:
    'Bring your blockchain ideas to life with Isaac’s technical expertise and Sui-specific knowledge.',
  ctaText: 'Get Dev Help',
};

const MIKE_DATA = {
  herobg: '/assets/background/mikebg.png',
  hero: 'MIKE: Your\nData-Driven Crypto Expert',
  subhero:
    'Mike is perfect for traders of all levels, investors seeking data-driven\ninsights, and anyone wanting to understand the crypto market.',
  ideal: 'Trading, Research, Coin Knowledge',
  speciality:
    "Uncover market trends, identify profitable opportunities, and make informed trading decisions with Mike's expert crypto analysis.",
  skills: ['Data-driven', 'Strategic', 'Expert'],
  specialization: [
    {
      title: 'Technical Analysis',
      description: 'Master of chart patterns, indicators, and price action',
    },
    {
      title: 'Market Trends',
      description:
        'Deep understanding of current market dynamics and future predictions',
    },
    {
      title: 'Trading Strategies',
      description:
        'Expertise in various trading approaches, from short-term scalping to long-term investing',
    },
    {
      title: 'Risk Management',
      description: 'Prioritizes capital preservation and smart risk assessment',
    },
    {
      title: 'Fundamental Analysis',
      description:
        'Evaluates crypto projects based on their technology, team, and tokenomics',
    },
  ],
  ctaDesc:
    "Make smarter trading decisions, optimize your portfolio, and stay\nahead of the curve with Mike's analytical prowess.",
  ctaText: 'Get Market Insights',
};

const JORDAN_DATA = {
  herobg: '/assets/background/jordanbg.png',
  hero: 'JORDAN: Your\nChill Crypto Companion',
  subhero:
    'Jordan is perfect for anyone feeling stressed or overwhelmed by the\ncrypto market, beginners looking for support, and those who\nappreciate a good laugh.',
  ideal: 'Beginners, Emotional Support, Stress Management',
  speciality:
    'Navigate the crypto rollercoaster with a smile. Jordan provides support, humor, and perspective to help you manage stress and stay positive.',
  skills: ['Supportive', 'Positive', 'Humorous'],
  specialization: [
    {
      title: 'Market Sentiment',
      description:
        'Keeps a pulse on the overall market mood and helps you avoid emotional trading.',
    },
    {
      title: 'Stress Management',
      description:
        'Provides practical tips and techniques for managing crypto-related anxiety.',
    },
    {
      title: 'Humour',
      description:
        'Lightens the mood with jokes, memes, and a positive outlook.',
    },
    {
      title: 'Community',
      description:
        'Connects you with a supportive community of like-minded individuals.',
    },
    {
      title: 'Positive Vibes',
      description:
        'Offers encouragement and reminds you of the long-term potential of crypto.',
    },
    {
      title: 'Crypto Psychology',
      description: 'Understands the emotional challenges of crypto investing.',
    },
  ],
  ctaDesc: "Throughout your crypto journey with Jordan's friendly guidance.",
  ctaText: 'Chat with Jordan',
};

export const ALL_AGENT_DATA = {
  isaac: ISAAC_DATA,
  mike: MIKE_DATA,
  jordan: JORDAN_DATA,
};
