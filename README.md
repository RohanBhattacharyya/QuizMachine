# Online Quiz Machine

## Overview

The Quiz Machine is an interactive, incremental quiz application inspired by popular platforms like Kahoot. Users can import custom-designed quizzes using a simple Markdown format, then play them one question at a time with vibrant, colorful interfaces. Immediate feedback is provided after each answer, making the experience engaging and educational.

## Objectives

- **Interactive Experience:**  
  - Present quizzes incrementally, one question per screen.
  - Use big, colorful buttons for answer choices to improve engagement.
  - Provide instant feedback after each question, showing whether the answer was correct and displaying the correct answer.

- **Quiz Import Capability:**  
  - Allow users to import quizzes using a custom Markdown format.
  - Support various question types, including multiple-choice, multiple-select, and long-answer.

- **User-Friendly Navigation:**  
  - A landing page that lists available quizzes and offers an import option.
  - A quiz start screen that displays quiz details (e.g., number of questions, high score) and a "Start Quiz" button.
  - A quiz interface that guides users through questions one at a time.

- **High Score Tracking:**  
  - Save and display high scores for each quiz to motivate users.

- **Modern Web Technologies:**  
  - Built with HTML, CSS, and JavaScript for the frontend.
  - Uses Node.js with Express to serve static files.
  - Utilizes localStorage to persist quizzes and high scores across sessions.

## Custom Markdown Quiz Format

To import a quiz, the quiz file must be written in a custom Markdown format. Below is an example:

```markdown
# Quiz: My Awesome Quiz

## What is the capital of France?
Type: multiple-choice
- [ ] Berlin
- [x] Paris
- [ ] Rome
- [ ] Madrid

## Which of the following are prime numbers?
Type: multiple-select
- [x] 2
- [x] 3
- [ ] 4
- [x] 5

## Explain your reasoning for your answer:
Type: long-answer
```

**Format Details:**
- The quiz title is defined by a first-level header starting with `# Quiz:`.
- Each question starts with a second-level header (`##`) that includes the question text.
- The type of question is specified immediately after the question header (e.g., `Type: multiple-choice`).
- For multiple-choice or multiple-select questions, answer options are listed using `- [ ]` for incorrect answers and `- [x]` for correct ones.
- Long-answer questions do not include any answer options.

## Project Structure

```
project/
├── public/
│   ├── index.html         # Landing page: lists quizzes and provides an import button
│   ├── start.html         # Quiz start screen: displays quiz details and a start button
│   ├── quiz.html          # Quiz interface: shows one question at a time with immediate feedback
│   ├── css/
│   │   └── style.css      # Enhanced styles for vibrant graphics and responsive design
│   └── js/
│       ├── main.js        # Handles landing page, quiz import, and start screen functionality
│       ├── quizParser.js  # Parses quizzes from the custom Markdown format
│       └── quizManager.js # Manages incremental quiz flow, answer checking, and feedback
├── server.js              # Express server for serving static files
├── package.json           # Project metadata and dependency information
└── README.md              # Project overview and instructions (this file)
```

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Server:**
   ```bash
   npm start
   ```

4. **Access the Application:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Import a quiz using the custom Markdown file format.
   - Select a quiz from the landing page to view its details on the start screen.
   - Click "Start Quiz" to begin, answer one question at a time, and receive immediate feedback.

## Features

- **Incremental Quiz Flow:**  
  - One question is presented at a time with a focused, uncluttered interface.
  - Immediate feedback on each answer, with clear visual indications of correct and incorrect choices.

- **Customizable Quiz Import:**  
  - Easily import and manage quizzes using a straightforward Markdown syntax.
  - Supports multiple question types for versatile quiz creation.

- **High Score Tracking:**  
  - High scores are saved per quiz to challenge users to improve.

- **Responsive & Vibrant Design:**  
  - Enhanced graphics with colorful buttons and an intuitive layout ensure a modern user experience.

## Technologies

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Storage:** localStorage for persisting quizzes and scores

## License

This project is licensed under the MIT License.