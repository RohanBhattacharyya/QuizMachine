/* public/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    // On the landing page: load quiz list and handle quiz import.
    const quizListEl = document.getElementById('quizList');
    if (quizListEl) {
      loadQuizList();
    }
    
    const importBtn = document.getElementById('importBtn');
    if (importBtn) {
      importBtn.addEventListener('click', () => {
        const fileInput = document.getElementById('quizFile');
        const file = fileInput.files[0];
        if (!file) {
          alert('Please select a markdown file.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          const markdownText = e.target.result;
          const quiz = parseQuizMarkdown(markdownText);
          saveQuiz(quiz);
          alert('Quiz imported successfully!');
          loadQuizList();
        };
        reader.readAsText(file);
      });
    }
    
    // On the start page (start.html): load quiz details.
    const quizTitleEl = document.getElementById('quizTitle');
    if (quizTitleEl && window.location.pathname.includes('start.html')) {
      loadQuizDetails();
    }
  });
  
  // Load quizzes from localStorage and display as links.
  function loadQuizList() {
    const quizListEl = document.getElementById('quizList');
    quizListEl.innerHTML = '';
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    if (quizzes.length === 0) {
      quizListEl.innerHTML = '<li>No quizzes available. Import one!</li>';
      return;
    }
    quizzes.forEach((quiz, index) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `start.html?quizId=${index}`;
      a.className = 'quiz-item';
      a.innerText = quiz.title;
      li.appendChild(a);
      quizListEl.appendChild(li);
    });
  }
  
  // Save a new quiz to localStorage.
  function saveQuiz(quiz) {
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quiz.highScore = quiz.highScore || 0;
    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }
  
  // On start.html, load selected quiz details.
  function loadQuizDetails() {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('quizId');
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    if (quizId === null || !quizzes[quizId]) {
      document.getElementById('quizDetails').innerHTML = '<p>Quiz not found.</p>';
      return;
    }
    const quiz = quizzes[quizId];
    document.getElementById('quizTitle').innerText = quiz.title;
    const quizDetailsEl = document.getElementById('quizDetails');
    quizDetailsEl.innerHTML = `
      <p>Number of Questions: ${quiz.questions.length}</p>
      <p>High Score: ${quiz.highScore}</p>
    `;
    // When "Start Quiz" is clicked, initialize current quiz state.
    const startBtn = document.getElementById('startQuizBtn');
    startBtn.addEventListener('click', () => {
      const currentQuiz = {
        quizId: parseInt(quizId),
        ...quiz,
        currentQuestionIndex: 0,
        score: 0
      };
      localStorage.setItem('currentQuiz', JSON.stringify(currentQuiz));
      window.location.href = 'quiz.html';
    });
  }
  