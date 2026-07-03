const questions = [
{
    type: "single",
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "Python", "Java"],
    answer: "CSS"
},
{
    type: "multiple",
    question: "Select all Programming Languages:",
    options: ["Python", "HTML", "Java", "CSS"],
    answer: ["Python", "Java"]
},
{
    type: "fill",
    question: "HTML stands for ______ Text Markup Language.",
    answer: "Hyper"
},
{
    type: "truefalse",
    question: "JavaScript is a programming language.",
    answer: true
}
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {

    const q = questions[currentQuestion];

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "none";

    if(q.type === "single"){

        q.options.forEach(option => {
            optionsEl.innerHTML += `
            <label class="option">
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>`;
        });
    }

    else if(q.type === "multiple"){

        q.options.forEach(option => {
            optionsEl.innerHTML += `
            <label class="option">
                <input type="checkbox" value="${option}">
                ${option}
            </label>`;
        });
    }

    else if(q.type === "fill"){

        optionsEl.innerHTML = `
        <input type="text" id="fillAnswer"
        placeholder="Enter your answer">`;
    }

    else if(q.type === "truefalse"){

        optionsEl.innerHTML = `
        <label class="option">
        <input type="radio" name="answer" value="true">
        True
        </label>

        <label class="option">
        <input type="radio" name="answer" value="false">
        False
        </label>`;
    }
}

submitBtn.addEventListener("click", () => {

    const q = questions[currentQuestion];
    let correct = false;

    if(q.type === "single"){

        const selected =
        document.querySelector('input[name="answer"]:checked');

        if(selected && selected.value === q.answer){
            correct = true;
        }
    }

    else if(q.type === "multiple"){

        const selected =
        [...document.querySelectorAll('input[type="checkbox"]:checked')]
        .map(item => item.value);

        correct =
        JSON.stringify(selected.sort()) ===
        JSON.stringify(q.answer.sort());
    }

    else if(q.type === "fill"){

        const value =
        document.getElementById("fillAnswer").value.trim();

        if(value.toLowerCase() === q.answer.toLowerCase()){
            correct = true;
        }
    }

    else if(q.type === "truefalse"){

        const selected =
        document.querySelector('input[name="answer"]:checked');

        if(selected){
            correct = (selected.value === String(q.answer));
        }
    }

    if(correct){
        score++;
        alert("Correct Answer!");
    }else{
        alert("Wrong Answer!");
    }

    submitBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
});

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    }
    else{
        document.getElementById("quiz-box").classList.add("hidden");
        document.getElementById("result-box").classList.remove("hidden");
        document.getElementById("score").textContent =
        score + " / " + questions.length;
    }
});

loadQuestion();
