import { writeFileSync } from "fs";

const templates = [
  ["lesson-prop-003", "proportions", 2, "If 4 apples cost 2 dollars, how much for 10?", ["4", "5", "6", "8"], "5", "Unit price 0.50 times 10 equals 5."],
  ["lesson-prop-004", "proportions", 2, "A recipe for 6 servings uses 2 cups flour. Flour for 9 servings?", ["2 cups", "3 cups", "4 cups", "4.5 cups"], "3 cups", "Scale factor 1.5: 2 times 1.5 equals 3 cups."],
  ["lesson-prop-005", "proportions", 3, "A 6 ft shadow and 24 ft tree shadow. Person is 5 ft. Tree height?", ["15 ft", "20 ft", "24 ft", "30 ft"], "20 ft", "Proportion 5/6 equals h/24, so h equals 20 ft."],
  ["lesson-mix-002", "proportions", 2, "Mix 10L of 20% solution with water to get 15L of 10%. Water added?", ["5 L", "10 L", "12 L", "15 L"], "5 L", "Amount of pure substance stays equal on both sides."],
  ["lesson-mix-003", "proportions", 3, "Coffee uses 3 parts beans and 2 parts water. With 12 oz beans, total drink?", ["15 oz", "18 oz", "20 oz", "24 oz"], "20 oz", "Five parts total; each part is 4 oz."],
  ["lesson-mix-004", "proportions", 3, "How much pure antifreeze is in 5L of 40% mix?", ["1 L", "2 L", "2.5 L", "4 L"], "2 L", "0.4 times 5 equals 2 liters."],
  ["lesson-unit-002", "word_problem_translation", 2, "Convert 3 yards to feet.", ["6 ft", "9 ft", "12 ft", "36 ft"], "9 ft", "3 times 3 equals 9 feet."],
  ["lesson-unit-003", "word_problem_translation", 2, "Convert 2.5 hours to minutes.", ["120 min", "130 min", "150 min", "250 min"], "150 min", "2.5 times 60 equals 150 minutes."],
  ["lesson-unit-004", "word_problem_translation", 3, "A car travels 60 mph for 2.5 hours. Distance?", ["120 mi", "130 mi", "150 mi", "180 mi"], "150 mi", "60 times 2.5 equals 150 miles."],
  ["lesson-ineq-003", "inequalities", 2, "Which satisfies 2x + 1 < 7?", ["x = 2", "x = 3", "x = 4", "x = 5"], "x = 2", "2x less than 6, so x less than 3."],
  ["lesson-ineq-004", "inequalities", 3, "Solve: 3x - 2 >= 10", ["x >= 3", "x >= 4", "x >= 5", "x <= 4"], "x >= 4", "3x >= 12, so x >= 4."],
  ["lesson-alg-003", "algebra_expressions", 2, "Simplify: 5a - 2a + 3", ["3a + 3", "7a + 3", "3a", "7a"], "3a + 3", "Combine like terms: 3a plus 3."],
  ["lesson-alg-004", "algebra_expressions", 3, "Expand: 2(x + 3)", ["2x + 3", "2x + 6", "x + 6", "2x + 5"], "2x + 6", "Distribute: 2x + 6."],
  ["lesson-sys-002", "systems_of_equations", 3, "Solve: y = 2x and x + y = 9", ["x=3,y=6", "x=2,y=4", "x=4,y=8", "x=3,y=9"], "x=3,y=6", "Substitute: 3x = 9, x = 3, y = 6."],
  ["lesson-sys-003", "systems_of_equations", 3, "Solve: 2x + y = 7 and x - y = 2", ["x=3,y=1", "x=2,y=3", "x=4,y=-1", "x=1,y=5"], "x=3,y=1", "Add equations: 3x = 9."],
  ["lesson-sys-004", "systems_of_equations", 3, "10 tickets cost 42 dollars. Child 3, adult 5. How many adults?", ["4", "5", "6", "7"], "6", "3c + 5a = 42 with c + a = 10 gives a = 6."],
  ["lesson-geo-003", "geometry_formulas", 2, "Area of rectangle 8 by 5?", ["13", "26", "40", "45"], "40", "8 times 5 equals 40 square units."],
  ["lesson-geo-004", "geometry_formulas", 2, "Area of triangle base 10, height 6?", ["30", "60", "16", "20"], "30", "One half times 10 times 6 equals 30."],
  ["lesson-tri-002", "geometry_formulas", 2, "Triangle angles 50 and 60 degrees. Third angle?", ["60", "70", "80", "90"], "70", "180 minus 110 equals 70 degrees."],
  ["lesson-tri-003", "geometry_formulas", 3, "Isosceles triangle sides 5, 5, and base 6. Perimeter?", ["11", "16", "15", "10"], "16", "5 + 5 + 6 equals 16."],
  ["lesson-tri-004", "geometry_formulas", 2, "Right triangle legs 5 and 12. Hypotenuse?", ["13", "17", "15", "10"], "13", "5-12-13 Pythagorean triple."],
  ["lesson-pct-009", "percentages", 2, "What is 15% of 80?", ["10", "12", "15", "20"], "12", "0.15 times 80 equals 12."],
  ["lesson-pct-010", "percentages", 2, "50 is what percent of 200?", ["20%", "25%", "30%", "40%"], "25%", "50/200 equals 0.25."],
  ["lesson-frac-004", "fractions", 2, "What is 2/3 of 18?", ["6", "9", "12", "15"], "12", "18 divided by 3, times 2 equals 12."],
  ["lesson-frac-005", "fractions", 3, "Which equals 3/4?", ["6/9", "9/12", "4/6", "2/5"], "9/12", "9/12 simplifies to 3/4."],
  ["lesson-ratio-004", "ratios", 2, "Divide 24 in ratio 2:1", ["8 and 16", "12 and 12", "6 and 18", "10 and 14"], "8 and 16", "Three parts: 24/3 = 8 per part."],
  ["lesson-lin-004", "linear_equations", 2, "Solve: x - 5 = 12", ["x = 7", "x = 17", "x = -7", "x = 6"], "x = 17", "Add 5 to both sides."],
  ["lesson-lin-005", "linear_equations", 3, "Solve: 4x + 8 = 24", ["x = 2", "x = 4", "x = 6", "x = 8"], "x = 4", "4x = 16, x = 4."],
  ["lesson-wp-004", "word_problem_translation", 2, "A book costs 18 after a 10% discount. Original price?", ["16.20", "19.80", "20", "22"], "20", "90% of original equals 18."],
  ["lesson-wp-005", "word_problem_translation", 3, "Pipe A fills tank in 6 hrs, B in 3 hrs. Together?", ["1 hr", "2 hrs", "3 hrs", "4 hrs"], "2 hrs", "Rates 1/6 + 1/3 = 1/2 per hour."],
];

const sections = {
  proportions: "arithmetic_reasoning",
  word_problem_translation: "arithmetic_reasoning",
  percentages: "math_knowledge",
  ratios: "arithmetic_reasoning",
  fractions: "math_knowledge",
  inequalities: "math_knowledge",
  algebra_expressions: "math_knowledge",
  systems_of_equations: "math_knowledge",
  geometry_formulas: "math_knowledge",
  linear_equations: "math_knowledge",
};

const scope = {
  proportions: "official_arithmetic_reasoning",
  word_problem_translation: "prerequisite_skill",
  percentages: "official_math_knowledge",
  ratios: "official_arithmetic_reasoning",
  fractions: "prerequisite_skill",
  inequalities: "official_math_knowledge",
  algebra_expressions: "official_math_knowledge",
  systems_of_equations: "official_math_knowledge",
  geometry_formulas: "official_math_knowledge",
  linear_equations: "official_math_knowledge",
};

const out = templates.map(([id, skill, diff, prompt, choices, answer, explanation]) => ({
  id,
  section: sections[skill],
  scopeClassification: scope[skill],
  skillTag: skill,
  difficulty: diff,
  prompt,
  answerChoices: choices,
  correctAnswer: answer,
  explanation,
  estimatedSolveTimeSec: 25 + diff * 10,
  commonTrap: "Rushing without checking your work.",
  prerequisites: [skill],
}));

writeFileSync("packages/minerva-core/src/data/bulk-questions.json", JSON.stringify(out, null, 2));
console.log("Wrote", out.length, "bulk questions");
