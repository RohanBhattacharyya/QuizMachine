/* public/js/quizManager.js */

document.addEventListener('DOMContentLoaded', () => {
    const currentQuiz = JSON.parse(localStorage.getItem('currentQuiz'));
    if (!currentQuiz) {
      document.getElementById('quizContainer').innerHTML = '<p>No active quiz found. Please select a quiz from the homepage.</p>';
      return;
    }
    
    // Set the quiz title.
    document.getElementById('quizTitle').innerText = currentQuiz.title;
    
    // Get DOM elements.
    const quizContainer = document.getElementById('quizContainer');
    const feedbackEl = document.getElementById('feedback');
    const submitBtn = document.getElementById('submitAnswer');
    const nextBtn = document.getElementById('nextQuestion');
    
    // Render the current question.
    renderCurrentQuestion();
    
    submitBtn.addEventListener('click', () => {
      checkAnswer();
    });
    
    nextBtn.addEventListener('click', () => {
      currentQuiz.currentQuestionIndex++;
      feedbackEl.classList.add('hidden');
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
      renderCurrentQuestion();
    });
    
    function renderCurrentQuestion() {
      quizContainer.innerHTML = '';
      const qIndex = currentQuiz.currentQuestionIndex;
      if (qIndex >= currentQuiz.questions.length) {
        showResults();
        return;
      }
      const question = currentQuiz.questions[qIndex];
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      const questionTitle = document.createElement('h2');
      questionTitle.innerText = `Question ${qIndex + 1}: ${question.question}`;
      questionDiv.appendChild(questionTitle);
      
      if (question.type === 'multiple-choice' || question.type === 'multiple-select') {
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');
        question.options.forEach((option, index) => {
          const btn = document.createElement('button');
          btn.classList.add('option-button');
          btn.innerText = option.text;
          btn.dataset.optionIndex = index;
          btn.addEventListener('click', () => {
            if (question.type === 'multiple-select') {
              btn.classList.toggle('selected');
            } else {
              const allButtons = optionsDiv.querySelectorAll('.option-button');
              allButtons.forEach(b => b.classList.remove('selected'));
              btn.classList.add('selected');
            }
          });
          optionsDiv.appendChild(btn);
        });
        questionDiv.appendChild(optionsDiv);
      } else if (question.type === 'long-answer') {
        const textarea = document.createElement('textarea');
        textarea.rows = 4;
        textarea.cols = 50;
        textarea.id = 'longAnswer';
        questionDiv.appendChild(textarea);
      } else {
        questionDiv.innerHTML = '<p>Unknown question type.</p>';
      }
      
      quizContainer.appendChild(questionDiv);
    }
    
    function checkAnswer() {
      const qIndex = currentQuiz.currentQuestionIndex;
      const question = currentQuiz.questions[qIndex];
      let isCorrect = false;
      
      if (question.type === 'multiple-choice') {
        const selectedBtn = document.querySelector('.option-button.selected');
        if (!selectedBtn) {
          alert('Please select an answer.');
          return;
        }
        const selectedIndex = parseInt(selectedBtn.dataset.optionIndex);
        isCorrect = question.options[selectedIndex].correct;
        highlightCorrectAnswer(question, selectedIndex);
      } else if (question.type === 'multiple-select') {
        const selectedBtns = document.querySelectorAll('.option-button.selected');
        if (selectedBtns.length === 0) {
          alert('Please select at least one answer.');
          return;
        }
        const selectedIndexes = Array.from(selectedBtns).map(btn => parseInt(btn.dataset.optionIndex));
        const correctIndexes = question.options.map((opt, idx) => opt.correct ? idx : null).filter(idx => idx !== null);
        isCorrect = arraysEqual(selectedIndexes.sort(), correctIndexes.sort());
        highlightCorrectAnswer(question, selectedIndexes);
      } else if (question.type === 'long-answer') {
        const answerText = document.getElementById('longAnswer').value.trim();
        // For long answers, automated grading is not implemented.
        isCorrect = false;
      }
      
      if (question.type !== 'long-answer' && isCorrect) {
        currentQuiz.score++;
      }
      
      localStorage.setItem('currentQuiz', JSON.stringify(currentQuiz));
      showFeedback(isCorrect, question);
      submitBtn.classList.add('hidden');
      nextBtn.classList.remove('hidden');
    }
    
    function highlightCorrectAnswer(question, userSelection) {
      const optionButtons = document.querySelectorAll('.option-button');
      if (question.type === 'multiple-choice') {
        optionButtons.forEach(btn => {
          const idx = parseInt(btn.dataset.optionIndex);
          if (question.options[idx].correct) {
            btn.classList.add('correct');
          } else if (idx === userSelection && !question.options[idx].correct) {
            btn.classList.add('incorrect');
          }
        });
      } else if (question.type === 'multiple-select') {
        optionButtons.forEach(btn => {
          const idx = parseInt(btn.dataset.optionIndex);
          if (question.options[idx].correct) {
            btn.classList.add('correct');
          }
          if (Array.isArray(userSelection) && userSelection.includes(idx) && !question.options[idx].correct) {
            btn.classList.add('incorrect');
          }
        });
      }
    }
    
    function showFeedback(isCorrect, question) {
      let message = '';
      if (question.type === 'long-answer') {
        message = 'Your answer has been recorded. Please check with your instructor for grading.';
      } else {
        message = isCorrect ? 'Correct!' : 'Incorrect!';
        if (question.type === 'multiple-choice') {
          const correctOption = question.options.find(opt => opt.correct);
          message += ` The correct answer was: "${correctOption.text}".`;
        } else if (question.type === 'multiple-select') {
          const correctOptions = question.options.filter(opt => opt.correct).map(opt => opt.text).join(', ');
          message += ` The correct answers were: ${correctOptions}.`;
        }
      }
      feedbackEl.innerText = message;
      feedbackEl.classList.remove('hidden');
    }
    
    function arraysEqual(a, b) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }
    
    function showResults() {
      quizContainer.innerHTML = `<h2>Quiz Complete!</h2>
        <p>Your score: ${currentQuiz.score} out of ${currentQuiz.questions.length}</p>`;
      
      const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
      const quizId = currentQuiz.quizId;
      if (currentQuiz.score > quizzes[quizId].highScore) {
        quizzes[quizId].highScore = currentQuiz.score;
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
      }
      
      const homeBtn = document.createElement('button');
      homeBtn.className = 'big-button';
      homeBtn.innerText = 'Back to Home';
      homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
      quizContainer.appendChild(homeBtn);
      
      submitBtn.classList.add('hidden');
      nextBtn.classList.add('hidden');
      feedbackEl.classList.add('hidden');
    }
  });
  