/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if(navToggle) {
    console.log('nav toggle');
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if(navClose) {
    console.log('nav close');
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');
function removeAfterClick() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(navLink => navLink.addEventListener('click', removeAfterClick));

/*=============== CHANGE BACKGROUND HEADER ===============*/


/*=============== CANVAS ===============*/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// canvas.width = '600px';
// canvas.height = '600px';
ctx.fillStyle = 'white';
// ctx.strokeStyle = 'white';
// ctx.lineWidth = 5;
console.log(ctx);

ctx.fillStyle = 'white';
// ctx.fillRect(250, 150, 100, 200);

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = 10;
    // this.radius = Math.random() * 12 + 4;
    // this.x = Math.random() * this.effect.width;
    // this.y = Math.random() * this.effect.height;
    this.x = this.radius + Math.random() * (this.effect.width - this.radius*2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius*2);
    // this.radius = 15;
    
    this.vx = Math.random()*2 - 2;
    this.vy = Math.random()*2 -2;
  }
  
  draw(context) {
    context.fillStyle = 'hsl(' + this.x*2 + ', 100%, 50%)';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    context.fill();
    context.stroke();
  }
  
  update() {
    this.x += this.vx;
    if(this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;
    
    this.y += this.vy;
    if(this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
    
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 60;
    this.createParticles();
  }
  
  createParticles() {
    for(let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context) {
    this.particles.forEach(particle => {
      particle.draw(context);
      particle.update();
    });
  }
}
const effect = new Effect(canvas);
effect.handleParticles(ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}
animate();

// ====== Quiz ======

const questions = [
    {
        question:"What is the atomic number of Carbon?", 
        options: [
            {text: '4', correct: false},
            {text: '6', correct: true}, 
            {text: '12', correct: false}, 
            {text: '5', correct: false}
        ]
    }, 
    {
        question:"What is the atomic number of Sodium?", 
    options: [
        {text: '8', correct: false},
        {text: '7', correct: false}, 
        {text: '11', correct: true}, 
        {text: '14', correct: false}
        ]
    }, 
    {
        question:"What is the symbol of Potassium?", 
    options: [
        {text: 'Be', correct: false},
        {text: 'P', correct: false}, 
        {text: 'Li', correct: false}, 
        {text: 'K', correct: true}
        ]
    }, 
    {
        question:"Which is the next element after Sulphur in the periodic table?", 
    options: [
        {text: 'Magnesium', correct: false},
        {text: 'Chlorine', correct: true}, 
        {text: 'Silicon', correct: false}, 
        {text: 'Boron', correct: false}
        ]
    }, 
    {
        question:"Neon and Argon are:", 
    options: [
        {text: 'Noble Gases', correct: false},
        {text: 'toxic gases', correct: false}, 
        {text: 'unreactive', correct: false}, 
        {text: 'Both unreactive and noble gases', correct: true}
        ]
    }
];

const question_sample = document.getElementById('question');
const optionsButtons = document.querySelector('.options');
const nextButton = document.getElementById('next-button');

let index = 0;
let score = 0;

function startQuiz() {
    index = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    displayQuestion();
}

function displayQuestion() {
    resetState();
    let currentQuestion = questions[index];
    let qNo = index + 1;
    question_sample.innerHTML = qNo + ". " + currentQuestion.question;

    currentQuestion.options.forEach(optioneach => {
        const button = document.createElement('button');
        button.innerHTML = optioneach.text;
        button.classList.add('btn');
        optionsButtons.appendChild(button);
        if(optioneach.correct) {
            button.dataset.correct = optioneach.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while(optionsButtons.firstChild) {
        optionsButtons.removeChild(optionsButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }
    else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(optionsButtons.children).forEach(button => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
    // nextButton.style.visibility = enabled;
}

function showScore() {
    resetState();
    question_sample.innerHTML = 'You scored ' + score + ' out of ' + questions.length + '!';
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    index++;
    if(index < questions.length) {
        displayQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(index < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();