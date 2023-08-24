const questionImage = document.getElementById('question');
const choicesCard = document.querySelectorAll('.choice-card');
const levelText = document.getElementById('level');

let level = 0;
const MAX_LEVEL = 2;

let questions = [
  {
    question: 'assets/images/mata.png',
    choice1: 'Mata',
    choice2: 'Hidung',
    choice3: 'Kepala',
    choice4: 'Telinga',
    answer: 1,
  },
  {
    question: 'assets/images/hidung.png',
    choice1: 'Telinga',
    choice2: 'Tangan',
    choice3: 'Hidung',
    choice4: 'Mulut',
    answer: 3,
  },
  {
    question: 'assets/images/mulut.png',
    choice1: 'Mata',
    choice2: 'Telinga',
    choice3: 'Kepala',
    choice4: 'Mulut',
    answer: 4,
  },
];

let shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

const generateQuestion = () => {
  questionImage.src = shuffledQuestions[level].question;
};

const generateChoice = () => {
  choicesCard.forEach((card, index) => {
    let choice;
    if (index === 0) {
      choice = `A. ${shuffledQuestions[level].choice1}`;
    } else if (index === 1) {
      choice = `B. ${shuffledQuestions[level].choice2}`;
    } else if (index === 2) {
      choice = `C. ${shuffledQuestions[level].choice3}`;
    } else if (index === 3) {
      choice = `D. ${shuffledQuestions[level].choice4}`;
    }
    card.innerHTML = `<div class="card card-body">
                        <h5 class="card-title">${choice}</h5>
                      </div>`;
  });
};

const generateLevel = () => {
  levelText.innerText = `Level ${level + 1}`;
};

const incrementLevel = () => {
  level++;
  generateLevel();
};

const checkWin = () => {
  if (level === MAX_LEVEL) {
    setTimeout(() => {
      let doneSound = new Audio('assets/audio/done.mp3');
      doneSound.play();
      doneSound.volume = 0.5;

      Swal.fire({
        title: 'Selesai!',
        text: 'Permainan sudah selesai!',
        icon: 'success',
        imageUrl: 'assets/images/true.gif',
        imageWidth: 150,
        imageAlt: 'Custom image',
      }).then(() => {
        return window.location.assign('index.html');
      });
    }, 1000);
  }
};

const handleClickChoice = () => {
  choicesCard.forEach((card) => {
    card.addEventListener('click', () => {
      if (card.dataset['choice'] == shuffledQuestions[level].answer) {
        let successSound = new Audio('assets/audio/success.mp3');
        successSound.play();
        successSound.volume = 0.5;

        Swal.fire({
          title: 'Benar!',
          text: 'Jawaban kamu benar!',
          icon: 'success',
          imageUrl: 'assets/images/true.gif',
          imageWidth: 150,
          imageAlt: 'Custom image',
        });
        checkWin();
        if (level !== MAX_LEVEL) {
          incrementLevel();
          generateQuestion();
          generateChoice();
        }
      } else {
        let failSound = new Audio('assets/audio/fail.mp3');
        failSound.play();
        failSound.volume = 0.5;

        Swal.fire({
          title: 'Kurang Tepat!',
          text: 'Jawaban kamu kurang tepat!',
          icon: 'error',
          imageUrl: 'assets/images/false.gif',
          imageWidth: 150,
          imageAlt: 'Custom image',
        });
      }
    });
  });
};

const init = () => {
  generateLevel();
  generateQuestion();
  generateChoice();
  handleClickChoice();
};

init();
