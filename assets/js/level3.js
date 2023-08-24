let questions = [
  {
    image: 'assets/images/penggaris.png',
    question: 'Bahasa inggris dari penggaris adalah...',
    choice1: 'Book',
    choice2: 'Pencil',
    choice3: 'Ruler',
    choice4: 'Eraser',
    answer: 3,
  },
  {
    image: 'assets/images/pensil.png',
    question: 'Bahasa inggris dari pensil adalah...',
    choice1: 'Book',
    choice2: 'Pencil',
    choice3: 'Ruler',
    choice4: 'Eraser',
    answer: 2,
  },
  {
    image: 'assets/images/penghapus.png',
    question: 'Bahasa inggris dari penghapus adalah...',
    choice1: 'Book',
    choice2: 'Pencil',
    choice3: 'Ruler',
    choice4: 'Eraser',
    answer: 4,
  },
];

let shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

const questionText = document.getElementById('question');
const questionImage = document.getElementById('question-image');
const choicesCard = document.querySelectorAll('.choice-card');
const circleLevels = document.querySelectorAll('.circle-level');
const scoreText = document.getElementById('score-text');
const exitMenu = document.getElementById('exit-menu');
const musicPlayer = document.getElementById('music-player');

let level = 0;
let count = 0;
let score1 = localStorage.getItem('score1') ? Number(localStorage.getItem('score1')) : 0;
let score2 = localStorage.getItem('score2') ? Number(localStorage.getItem('score2')) : 0;
let score = score1 + score2;
const MAX_COUNT = 3;
const BONUS_SCORE = 10;
const MIN_SCORE = 5;

const music = new Audio('assets/audio/music.mp3');
music.volume = 0.2;

const generateQuestion = () => {
  questionText.innerText = `${count + 1}. ${shuffledQuestions[count].question}`;
  questionImage.src = shuffledQuestions[count].image;
};

const generateChoice = () => {
  choicesCard.forEach((card, index) => {
    let choice;
    if (index === 0) {
      choice = `A. ${shuffledQuestions[count].choice1}`;
    } else if (index === 1) {
      choice = `B. ${shuffledQuestions[count].choice2}`;
    } else if (index === 2) {
      choice = `C. ${shuffledQuestions[count].choice3}`;
    } else if (index === 3) {
      choice = `D. ${shuffledQuestions[count].choice4}`;
    }
    card.innerHTML = `<div class="card card-body">
                        <h5 class="card-title">${choice}</h5>
                      </div>`;
  });
};

const checkWin = () => {
  if (count === MAX_COUNT) {
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
        localStorage.setItem('score', score);
        return window.location.assign('score.html');
      });
    }, 1000);
  }
};

const showScore = () => {
  scoreText.innerText = score;
};

const updateScore = (option) => {
  count++;
  option === 'success' ? (score += BONUS_SCORE) : score > 0 ? (score -= MIN_SCORE) : (score += 0);
  showScore();
};

const handleClickChoice = () => {
  choicesCard.forEach((card) => {
    card.addEventListener('click', () => {
      if (card.dataset['choice'] == shuffledQuestions[count].answer) {
        let successSound = new Audio('assets/audio/success.mp3');
        successSound.play();
        successSound.volume = 0.5;

        updateScore('success');

        Swal.fire({
          title: 'Benar!',
          text: 'Jawaban kamu benar!',
          icon: 'success',
          imageUrl: 'assets/images/true.gif',
          imageWidth: 150,
          imageAlt: 'Custom image',
        });
      } else {
        let failSound = new Audio('assets/audio/fail.mp3');
        failSound.play();
        failSound.volume = 0.5;

        updateScore('fail');

        Swal.fire({
          title: 'Kurang Tepat!',
          text: 'Jawaban kamu kurang tepat!',
          icon: 'error',
          imageUrl: 'assets/images/false.gif',
          imageWidth: 150,
          imageAlt: 'Custom image',
        });
      }

      checkWin();
      if (count !== MAX_COUNT) {
        generateQuestion();
        generateChoice();
      }
    });
  });
};

const handlePlayMusic = () => {
  musicPlayer.addEventListener('click', () => {
    if (musicPlayer.classList.contains('playing')) {
      musicPlayer.classList.remove('playing');
      musicPlayer.innerHTML = `<i class="fas fa-volume-up"></i>`;
      music.pause();
    } else {
      musicPlayer.classList.add('playing');
      musicPlayer.innerHTML = `<i class="fas fa-volume-mute"></i>`;
      music.play();
    }
  });
};

const handleExitGame = () => {
  exitMenu.addEventListener('click', () => {
    Swal.fire({
      title: 'Keluar?',
      text: 'Kamu yakin ingin keluar dari permainan?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonText: 'Keluar',
      imageUrl: 'assets/images/petunjuk.gif',
      imageWidth: 150,
      imageAlt: 'Custom image',
    }).then((result) => {
      if (result.isConfirmed) {
        return window.location.assign('index.html');
      }
    });
  });
};

const init = () => {
  showScore();
  generateQuestion();
  generateChoice();
  handleClickChoice();
  handlePlayMusic();
  handleExitGame();
};

init();
