/* public/js/quizParser.js */
// Custom Markdown Format:
// # Quiz: Quiz Title
//
// ## Question Text
// Type: [multiple-choice|multiple-select|long-answer]
// - [ ] Option text (use '- [x]' to indicate correct answer)
// For long-answer questions, no options are needed.

function parseQuizMarkdown(markdownText) {
    const lines = markdownText.split('\n');
    const quiz = {
      title: '',
      questions: []
    };
    let currentQuestion = null;
  
    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('# ')) {
        // Quiz title
        if (!quiz.title) {
          quiz.title = line.replace('#', '').trim().replace(/^Quiz:\s*/i, '');
        }
      } else if (line.startsWith('## ')) {
        // Start a new question
        if (currentQuestion) {
          quiz.questions.push(currentQuestion);
        }
        currentQuestion = {
          question: line.replace('##', '').trim(),
          type: '',
          options: []
        };
      } else if (line.startsWith('Type:')) {
        if (currentQuestion) {
          currentQuestion.type = line.replace('Type:', '').trim().toLowerCase();
        }
      } else if (line.startsWith('- [')) {
        const isCorrect = line.substring(0, 5).toLowerCase() === '- [x]';
        const optionText = line.substring(5).trim();
        if (currentQuestion) {
          currentQuestion.options.push({ text: optionText, correct: isCorrect });
        }
      }
    });
    if (currentQuestion) {
      quiz.questions.push(currentQuestion);
    }
    return quiz;
  }
  