export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Which planet is the largest in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correct: 1
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    correct: 2
  },
  {
    question: "How many moons does Earth have?",
    options: ["0", "1", "2", "3"],
    correct: 1
  },
  {
    question: "Which planet has the most prominent ring system?",
    options: ["Jupiter", "Uranus", "Neptune", "Saturn"],
    correct: 3
  },
  {
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correct: 1
  },
  {
    question: "Which planet rotates on its side with a 98-degree tilt?",
    options: ["Neptune", "Saturn", "Uranus", "Pluto"],
    correct: 2
  },
  {
    question: "What percentage of Earth's surface is covered by water?",
    options: ["50%", "60%", "71%", "80%"],
    correct: 2
  },
  {
    question: "Which planet has the strongest winds in the solar system?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: 3
  },
  {
    question: "Which is the smallest planet in our solar system?",
    options: ["Mars", "Mercury", "Venus", "Earth"],
    correct: 1
  },
  {
    question: "How long does it take light from the Sun to reach Earth?",
    options: ["4 minutes", "8 minutes", "12 minutes", "16 minutes"],
    correct: 1
  }
];
