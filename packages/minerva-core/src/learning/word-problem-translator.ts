export interface TranslationStep {
  label: string;
  prompt: string;
  userInput?: string;
}

export interface WordProblemTranslation {
  originalProblem: string;
  steps: TranslationStep[];
  finalEquation: string;
  solution: string;
}

export interface WordProblemTranslatorEngine {
  translate(problem: string): WordProblemTranslation;
}

export function createWordProblemTranslatorEngine(): WordProblemTranslatorEngine {
  return {
    translate(problem) {
      return {
        originalProblem: problem,
        steps: [
          {
            label: "Identify the unknown",
            prompt: "What are you trying to find? Write it as a variable.",
          },
          {
            label: "Extract numbers",
            prompt: "List every number and what it represents.",
          },
          {
            label: "Find the relationship",
            prompt: "What operation connects the numbers to the unknown?",
          },
          {
            label: "Build the equation",
            prompt: "Write one equation that models the situation.",
          },
        ],
        finalEquation: "Set up your equation here",
        solution: "Solve step by step after building the equation.",
      };
    },
  };
}
