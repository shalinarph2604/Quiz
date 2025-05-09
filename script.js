//data pertanyaan dan jawaban//
const quizData = [
    {
        question: "Apa Ibukota Indonesia?",
        choices: ["Jakarta", "Bandung", "Semarang", "Medan"],
        correct: 0, // letak indeks jawaban yang benar//
    },
    {
        question: "Apa nama makanan khas Sumatera Selatan?",
        choices: ["Kerak telor", "Gudeg", "Pempek", "Rendang"],
        correct: 2,
    },
    {
        question: "Mana kah yang termasuk hewan karnivora?",
        choices: ["Ayam", "Harimau", "Kuda", "Kelinci"],
        correct: 1,
    },
    {
        question: "Ikan bernafas dengan?",
        choices: ["Paru-paru", "Kulit", "Trakea", "Insang"],
        correct: 3,
    },
    {
        question: "Apa nama gunung tertinggi di dunia?",
        choices: ["Kilimanjaro", "Everest", "Fuji", "Merapi"],
        correct: 1,
    }
];

//variabel global//
let currentQuestionIndex = 0;
let selectedChoice = null;
let timer;
let timeLeft = 10; //timer 10 detik//

//menghubungkan ke html//
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next");

//fungsi untuk memunculkan pertanyaan//
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = ""; // Clear previous choices
    feedbackEl.textContent = ""; // Clear previous feedback
    nextBtn.style.display = "none"; // Hide Next button

    // Populate choices
    currentQuestion.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement("button");
        choiceBtn.classList.add("choice");
        choiceBtn.textContent = choice;
        choiceBtn.addEventListener("click", () => {
            selectChoice(index);
        });
        choicesEl.appendChild(choiceBtn);
    });

    // Reset timer
    resetTimer();
}

//fungsi jawaban benar atau salah//
function selectChoice(index) {
    clearInterval(timer); // Stop the timer
    const currentQuestion = quizData[currentQuestionIndex];
    if (index === currentQuestion.correct) {
        feedbackEl.textContent = "Benar!";
        feedbackEl.style.color = "green";
    } else {
        feedbackEl.textContent = "Salah!";
        feedbackEl.style.color = "red";
    }

    // memunculkan tombol next
    nextBtn.style.display = "block";
}

// timer
function resetTimer() {
    timeLeft = 10;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackEl.textContent = "Waktu habis!";
            feedbackEl.style.color = "orange";

            // memunculkan tombol next
            nextBtn.style.display = "block";
        }
    }, 1000);
}

// akhir quiz
function endQuiz() {
    questionEl.textContent = "Kuis selesai!";
    choicesEl.innerHTML = "";
    feedbackEl.textContent = "Terima kasih sudah bermain!";
    timerEl.textContent = "";
    nextBtn.style.display = "none";
}

// klik tombol next
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
});

// memulai quiz
loadQuestion()