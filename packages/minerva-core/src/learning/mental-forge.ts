import type { SkillTag } from "../types";

export interface MentalForgeDrill {
  id: string;
  skillTag: SkillTag;
  prompt: string;
  answer: number;
  timeLimitSec: number;
}

export interface MentalForgeEngine {
  generateDrill(skillTag: SkillTag, difficulty: 1 | 2 | 3): MentalForgeDrill;
  getProgressionPath(): SkillTag[];
}

const PROGRESSION: SkillTag[] = [
  "addition",
  "subtraction",
  "multiplication",
  "division",
  "fractions",
  "decimals",
  "percentages",
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createMentalForgeEngine(): MentalForgeEngine {
  return {
    generateDrill(skillTag, difficulty) {
      let prompt = "";
      let answer = 0;
      const d = difficulty;

      switch (skillTag) {
        case "addition": {
          const a = randomInt(10 * d, 50 * d);
          const b = randomInt(10 * d, 50 * d);
          prompt = `${a} + ${b}`;
          answer = a + b;
          break;
        }
        case "subtraction": {
          const a = randomInt(20 * d, 99 * d);
          const b = randomInt(5 * d, a);
          prompt = `${a} - ${b}`;
          answer = a - b;
          break;
        }
        case "multiplication": {
          const a = randomInt(2, 9 + d * 2);
          const b = randomInt(2, 9 + d * 2);
          prompt = `${a} × ${b}`;
          answer = a * b;
          break;
        }
        case "division": {
          const b = randomInt(2, 9 + d);
          const answerVal = randomInt(2, 12);
          const a = b * answerVal;
          prompt = `${a} ÷ ${b}`;
          answer = answerVal;
          break;
        }
        case "percentages": {
          const pct = randomInt(5, 20) * 5;
          const base = randomInt(2, 20) * 10;
          prompt = `${pct}% of ${base}`;
          answer = (pct / 100) * base;
          break;
        }
        default: {
          const a = randomInt(1, 20);
          const b = randomInt(1, 20);
          prompt = `${a} + ${b}`;
          answer = a + b;
        }
      }

      return {
        id: `forge-${skillTag}-${Date.now()}`,
        skillTag,
        prompt,
        answer,
        timeLimitSec: Math.max(5, 15 - d * 2),
      };
    },

    getProgressionPath() {
      return [...PROGRESSION];
    },
  };
}
