# MINERVA Question Bank Generation Prompt

Create AFOQT-style quantitative questions only.

Required output fields:

- questionId
- section
- scopeClassification
- skillTags
- difficulty
- prompt
- answerChoices
- correctAnswer
- explanation
- estimatedSolveTime
- commonTrap
- prerequisites

Reject:

- Ambiguous questions
- Off-scope math
- More than one correct answer
- Missing explanation
- Invalid arithmetic
