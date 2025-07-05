const gameContainer = document.querySelector(".game-container"),
  userResultSide = gameContainer.querySelector(".user_side"), // Targetkan div pembungkusnya
  cpuResultSide = gameContainer.querySelector(".cpu_side"),   // Targetkan div pembungkusnya
  userResultImg = userResultSide.querySelector("img"),
  cpuResultImg = cpuResultSide.querySelector("img"),
  resultText = gameContainer.querySelector(".result"),
  optionImages = gameContainer.querySelectorAll(".option_image.card"),
  userScoreDisplay = document.getElementById("userScoreDisplay"),
  cpuScoreDisplay = document.getElementById("cpuScoreDisplay"),
  restartGameButton = document.getElementById("restartGameButton"),
  gameOverModalElement = document.getElementById("gameOverModal"),
  gameOverMessageElement = document.getElementById("gameOverMessage");

const gameOverModal = new bootstrap.Modal(gameOverModalElement);

let userScore = 0;
let cpuScore = 0;
const WINNING_SCORE = 5;

function updateScoreDisplay() {
  userScoreDisplay.textContent = userScore;
  cpuScoreDisplay.textContent = cpuScore;
}

function resetRoundVisuals() {
  userResultImg.src = "images/rock.png";
  cpuResultImg.src = "images/rock.png";
  optionImages.forEach((imgCard) => imgCard.classList.remove("active"));
  // Hapus kelas warna dan animasi dari ronde sebelumnya
  resultText.classList.remove("win", "lose", "draw");
  userResultSide.classList.remove("winner");
  cpuResultSide.classList.remove("winner");
}

function resetGame() {
  userScore = 0;
  cpuScore = 0;
  updateScoreDisplay();
  resultText.textContent = "Let's Play!";
  resetRoundVisuals();
  gameContainer.classList.remove("game-over");
  gameOverModal.hide();
}

function checkGameOver() {
  if (userScore >= WINNING_SCORE) {
    gameOverMessageElement.textContent = "Hore! Kamu Menang! 🎉";
    gameOverModal.show();
    gameContainer.classList.add("game-over");
    return true;
  }
  if (cpuScore >= WINNING_SCORE) {
    gameOverMessageElement.textContent = "Yah, CPU Menang! 🤖";
    gameOverModal.show();
    gameContainer.classList.add("game-over");
    return true;
  }
  return false;
}

optionImages.forEach((imageCard, index) => {
  imageCard.addEventListener("click", (e) => {
    if (gameContainer.classList.contains("start") || gameContainer.classList.contains("game-over")) {
      return;
    }

    // Reset visual sebelum ronde baru dimulai
    resetRoundVisuals();
    imageCard.classList.add("active");

    resultText.textContent = "Suit!";
    gameContainer.classList.add("start");

    // Timeout untuk animasi suit
    setTimeout(() => {
      gameContainer.classList.remove("start");

      let imageSrc = imageCard.querySelector("img").src;
      userResultImg.src = imageSrc;

      let randomNumber = Math.floor(Math.random() * 3);
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      cpuResultImg.src = cpuImages[randomNumber];

      let userValue = ["R", "P", "S"][index];
      let cpuValue = ["R", "P", "S"][randomNumber];

      let outcomes = {
        RR: "Draw", RP: "CPU", RS: "You",
        PP: "Draw", PR: "You", PS: "CPU",
        SS: "Draw", SR: "CPU", SP: "You",
      };

      let roundWinner = outcomes[userValue + cpuValue];
      
      // ===== PERUBAHAN UTAMA DI SINI =====
      // Hapus kelas warna lama sebelum menambahkan yang baru
      resultText.classList.remove("win", "lose", "draw");

      if (roundWinner === "You") {
        userScore++;
        resultText.textContent = "Kamu Menang Ronde Ini!";
        resultText.classList.add("win"); // Tambah kelas .win
        userResultSide.classList.add("winner"); // Tambah animasi glow ke pemenang
      } else if (roundWinner === "CPU") {
        cpuScore++;
        resultText.textContent = "CPU Menang Ronde Ini!";
        resultText.classList.add("lose"); // Tambah kelas .lose
        cpuResultSide.classList.add("winner"); // Tambah animasi glow ke pemenang
      } else {
        resultText.textContent = "Ronde Ini Seri!";
        resultText.classList.add("draw"); // Tambah kelas .draw
      }
      // ===================================

      updateScoreDisplay();
      checkGameOver();
      
    }, 1200); // Durasi animasi suit bisa disesuaikan
  });
});

restartGameButton.addEventListener("click", resetGame);

// Inisialisasi awal
updateScoreDisplay();
resetRoundVisuals();
resultText.textContent = "Ayo Mulai!";
