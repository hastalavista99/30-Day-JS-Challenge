const questions = [
  {
    id: 1,
    type: "multiple",
    question: "What is the capital of Kenya?",
    options: ["Nairobi", "Kampala", "Dodoma", "Addis Ababa"],
    answer: "Nairobi",
  },
  {
    id: 2,
    type: "boolean",
    question: "JavaScript is statically typed.",
    answer: false,
  },
  {
    id: 3,
    type: "text",
    question: "Name a JavaScript framework.",
    validate: (input) =>
      ["react", "vue", "angular"].includes(input.toLowerCase()),
  },
];

let current = 0;
let userAnswers = JSON.parse(localStorage.getItem("quizProgress")) || [];
let timerSeconds = 60;

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const timerEl = document.getElementById("timer");
const themeToggle = document.getElementById("theme-toggle");

function renderQuestion() {
  const q = questions[current];
  quizContainer.innerHTML = `<h2 class="text-lg font-semibold mb-2">Q${
    current + 1
  }. ${q.question}</h2>`;
  let html = "";
  const prevAnswer = userAnswers[current]?.response;

  if (q.type === "multiple") {
    html = q.options
      .map(
        (option) =>
          `<label class="block"><input type="radio" name="answer" value="${option}" class="mr-2" ${
            prevAnswer === option ? "checked" : ""
          }>${option}</label>`
      )
      .join("");
  } else if (q.type === "boolean") {
    html = `
          <label class="block"><input type="radio" name="answer" value="true" class="mr-2" ${
            prevAnswer === true ? "checked" : ""
          }>True</label>
          <label class="block"><input type="radio" name="answer" value="false" class="mr-2" ${
            prevAnswer === false ? "checked" : ""
          }>False</label>
        `;
  } else if (q.type === "text") {
    html = `<input type="text" name="answer" class="border p-2 w-full rounded" value="${
      prevAnswer || ""
    }" />`;
  }

  quizContainer.innerHTML += html;
}

function saveAnswer() {
  const q = questions[current];
  let value;

  if (q.type === "text") {
    value = document.querySelector("input[name='answer']").value.trim();
  } else {
    const selected = document.querySelector("input[name='answer']:checked");
    if (!selected) return null;
    value = q.type === "boolean" ? selected.value === "true" : selected.value;
  }

  userAnswers[current] = { id: q.id, response: value };
  localStorage.setItem("quizProgress", JSON.stringify(userAnswers));
  return true;
}

function showResults() {
  const results = userAnswers.reduce((score, { id, response }) => {
    const q = questions.find((q) => q.id === id);
    if (q.type === "multiple" || q.type === "boolean") {
      return score + (response === q.answer ? 1 : 0);
    } else if (q.type === "text") {
      return score + (q.validate && q.validate(response) ? 1 : 0);
    }
    return score;
  }, 0);

  quizContainer.innerHTML = `
        <h2 class="text-xl font-bold mb-2">Results</h2>
        <p class="text-lg">You scored <strong>${results}</strong> out of <strong>${questions.length}</strong></p>
        <button onclick="restartQuiz()" class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Restart</button>
      `;
  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
  localStorage.removeItem("quizProgress");
}

function restartQuiz() {
  current = 0;
  userAnswers = [];
  localStorage.removeItem("quizProgress");
  nextBtn.style.display = "inline-block";
  prevBtn.style.display = "inline-block";
  startQuiz();
}

function startQuiz() {
  renderQuestion();
  startTimer(timerSeconds, () => {
    alert("Time's up!");
    showResults();
  });
}

function startTimer(seconds, onExpire) {
  let remaining = seconds;
  timerEl.textContent = `⏱ ${remaining}s left`;
  const interval = setInterval(() => {
    remaining--;
    timerEl.textContent = `⏱ ${remaining}s left`;
    if (remaining <= 0) {
      clearInterval(interval);
      onExpire();
    }
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  if (!saveAnswer()) {
    alert("Please answer the question.");
    return;
  }
  current++;
  if (current >= questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("bg-gray-800");
  document.body.classList.toggle("text-white");
});

startQuiz();
