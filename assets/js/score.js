const finalScore = document.getElementById('final-score');

finalScore.innerText = localStorage.getItem('score') ?? 0;
