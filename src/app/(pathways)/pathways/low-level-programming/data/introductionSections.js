export const introductionSections = {
  'introduction': {
    title: 'What is a Computer?',
    description: 'Learn about computers and their fundamental concepts.',
    currentObjective: 1,
    totalObjectives: 3,
    nextSection: 'computer-components',
    objectives: [
      'Understand what a computer is',
      'Learn about basic computer components',
      'Understand binary and how computers process information'
    ],
    references: [
      {
        title: 'Introduction to Computer Science',
        url: 'https://www.edx.org/learn/computer-science'
      },
      {
        title: 'Computer Hardware Basics',
        url: 'https://www.tutorialspoint.com/computer_fundamentals/'
      },
      {
        title: 'Binary Number System',
        url: 'https://www.mathsisfun.com/binary-number-system.html'
      }
    ],
    content: {
      title: 'What is a Computer?',
      description: 'A computer is an electronic device that processes information according to a set of instructions. It can perform various tasks like calculations, data storage, and information processing.',
      keyPoints: [
        'Process Data Using Instructions: A computer only does what it is told. Think of instructions like a recipe telling it what steps to follow.',
        'Performs Complex Calculations at High Speeds: Computer can do math and solve problems much faster than we can.',
        'Works withDigital Information: All information in a computer is stored as numbers. These numbers represent letters, pictures, sounds-everything you see and hear.',
        'Follows an Input-Process-Output Cycle: Computers take information in (input), work on it (process), and then show us the result (output).',
      ]
    }
  },
  'computer-components': {
    title: 'Computer Components',
    description: 'Learn about the essential components that make up a computer system.',
    currentObjective: 2,
    totalObjectives: 3,
    previousSection: 'introduction',
    nextSection: 'understanding-binary',
    objectives: [
      'Understand what a computer is',
      'Learn about basic computer components',
      'Understand binary and how computers process information'
    ],
    references: [
      {
        title: 'Introduction to Computer Science',
        url: 'https://www.edx.org/learn/computer-science'
      },
      {
        title: 'Computer Hardware Basics',
        url: 'https://www.tutorialspoint.com/computer_fundamentals/'
      },
      {
        title: 'Binary Number System',
        url: 'https://www.mathsisfun.com/binary-number-system.html'
      }
    ],
    content: {
      title: 'Computer Components',
      description: 'Modern computers are made up of several key components that work together to process information and perform tasks.',
      keyPoints: [
        'CPU (Central Processing Unit): Think of it like the brain of a computer. It processes instructions and executes them.',
        'Memory (RAM): This is like a temporary workspace or a short-term memory where the computer keeps information ready for quick use.',
        'Storage (Hard Drive/SSD): This is where the computer store files, photos, videos, and programs for a long time-like a digital filing cabinet.',
        'Input/Output Devices: These allow you to give the computer instructions (input) and let it show you what it is doing (output).',
        'Motherboard: This is like the computer main road system, connecting all the parts together so they can talk to each other.'
      ]
    }
  },
  'understanding-binary': {
    title: 'Understanding Binary',
    description: 'Learn how computers represent and process information using binary.',
    currentObjective: 3,
    totalObjectives: 3,
    previousSection: 'computer-components',
    objectives: [
      'Understand what a computer is',
      'Learn about basic computer components',
      'Understand binary and how computers process information'
    ],
    references: [
      {
        title: 'Introduction to Computer Science',
        url: 'https://www.edx.org/learn/computer-science'
      },
      {
        title: 'Computer Hardware Basics',
        url: 'https://www.tutorialspoint.com/computer_fundamentals/'
      },
      {
        title: 'Binary Number System',
        url: 'https://www.mathsisfun.com/binary-number-system.html'
      }
    ],
    content: {
      title: 'Understanding Binary',
      description: 'Binary is the fundamental language of computers, using only two digits (0 and 1) to represent any kind of information, like text, numbers, and images.',
      keyPoints: [
        'Two Sates (On and Off): Computers use binary because their electronic parts can be either on (1) or off (0).',
        'Represents Everything: Every number, letter, or symbol in a computer is turned into a pattern of 0s and 1s. Example: The letter "A" is represented as 01000001 in binary.',
        'Bits and Bytes: Each 0 or 1 is called a "bit". Eight bits make a "byte", which can represent 256 diffrent values. Example: 01000001 is a byte that holds the value of the letter "A".',
        'Speed of Processing: Modern computers can work through billions of these 0-and-1 operations every second, making them very fast at handling information.',
      ]
    }
  }
};
