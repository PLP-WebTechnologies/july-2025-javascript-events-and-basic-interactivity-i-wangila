// --- Tic-Tac-Toe Game ---
const cells = document.querySelectorAll("[data-cell]");
const gameMessage = document.getElementById("gameMessage");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = Array(9).fill("");

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes("") ? null : "Draw";
}

function handleClick(e) {
  const cell = e.target;
  const index = [...cells].indexOf(cell);

  if (board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.style.color = currentPlayer === "X" ? "blue" : "red";

  const winner = checkWinner();
  if (winner) {
    gameMessage.textContent = winner === "Draw" ? "It's a draw!" : `${winner} wins! 🎉`;
    cells.forEach(c => c.removeEventListener("click", handleClick));
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

cells.forEach(cell => cell.addEventListener("click", handleClick));

restartBtn.addEventListener("click", () => {
  board.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
  });
  gameMessage.textContent = "";
  currentPlayer = "X";
  cells.forEach(cell => cell.addEventListener("click", handleClick));
});

// --- FAQ Toggle ---
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach((q) => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;
    answer.classList.toggle("show");
  });
});

// --- Form Submission with Email Validation ---
const form = document.getElementById("enquiryForm");
const formFeedback = document.getElementById("formFeedback");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email").value.trim();
  const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
  const emailParts = emailInput.split("@");

  if (emailParts.length !== 2 || !validDomains.includes(emailParts[1])) {
    formFeedback.style.color = "red";
    formFeedback.textContent = "❌ Please enter a valid email with a correct domain (e.g., gmail.com, yahoo.com).";
    return;
  }

  formFeedback.style.color = "green";
  formFeedback.textContent = "✅ Your information has been submitted successfully. Thank you for reaching out!";
  form.reset();
});

// --- Dark/Light Mode Toggle ---
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") 
    ? "☀️ Switch to Light Mode" 
    : "🌙 Toggle Dark/Light Mode";
});
