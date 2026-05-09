export interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const QUESTION_POOL: Question[] = [
  {
    id: 1,
    text: "Which planet has the strongest winds in the solar system?",
    options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
    correct: 2,
    explanation: "Neptune has winds reaching speeds of over 2,000 kilometers per hour."
  },
  {
    id: 2,
    text: "What is the Great Red Spot on Jupiter?",
    options: ["A giant mountain", "A massive storm", "An impact crater", "A frozen ocean"],
    correct: 1,
    explanation: "The Great Red Spot is a persistent high-pressure region in Jupiter's atmosphere."
  },
  {
    id: 3,
    text: "Which moon is the largest in our solar system?",
    options: ["Titan", "Ganymede", "Io", "Europa"],
    correct: 1,
    explanation: "Ganymede, a moon of Jupiter, is the largest moon and is even bigger than the planet Mercury."
  },
  {
    id: 4,
    text: "How long does it take for light from the Sun to reach Earth?",
    options: ["8 seconds", "8 minutes", "8 hours", "8 days"],
    correct: 1,
    explanation: "It takes approximately 8 minutes and 20 seconds for light to travel from the Sun to Earth."
  },
  {
    id: 5,
    text: "Which planet rotates on its side?",
    options: ["Venus", "Mars", "Uranus", "Neptune"],
    correct: 2,
    explanation: "Uranus has an axial tilt of 98 degrees, meaning it essentially orbits on its side."
  },
  {
    id: 6,
    text: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correct: 1,
    explanation: "Venus is the hottest planet due to its thick atmosphere which traps heat (greenhouse effect)."
  },
  {
    id: 7,
    text: "Olympus Mons, the tallest volcano in the solar system, is located on which planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
    explanation: "Olympus Mons on Mars is three times the height of Mount Everest."
  },
  {
    id: 8,
    text: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
    options: ["Mars", "Mercury", "Venus", "Jupiter"],
    correct: 2,
    explanation: "Venus is so bright it can often be seen just before sunrise or just after sunset."
  }
];

export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...QUESTION_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
