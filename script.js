const gameContainer = document.querySelector(".game-container"),
      userResultImg = gameContainer.querySelector(".user_result img"),
      cpuResultImg = gameContainer.querySelector(".cpu_result img"),
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
    optionImages.forEach(imgCard => imgCard.classList.remove("active"));
}

function resetGame() {
    userScore = 0;
    cpuScore = 0;
    updateScoreDisplay();
    resultText.textContent = "Let's Play!";
    resetRoundVisuals();
    gameContainer.classList.remove("game-over"); // Aktifkan kembali pilihan
    gameOverModal.hide();
}

function checkGameOver() {
    if (userScore >= WINNING_SCORE) {
        gameOverMessageElement.textContent = "Congrats! You Won!";
        gameOverModal.show();
        gameContainer.classList.add("game-over"); // Nonaktifkan pilihan
        return true;
    }
    if (cpuScore >= WINNING_SCORE) {
        gameOverMessageElement.textContent = "Oh No! CPU Won!";
        gameOverModal.show();
        gameContainer.classList.add("game-over"); // Nonaktifkan pilihan
        return true;
    }
    return false;
}

optionImages.forEach((imageCard, index) => {
    imageCard.addEventListener("click", (e) => {
        if (gameContainer.classList.contains("start") || gameContainer.classList.contains("game-over")) {
            return;
        }

        imageCard.classList.add("active");
        userResultImg.src = "images/rock.png";
        cpuResultImg.src = "images/rock.png";
        resultText.textContent = "Wait...";

        optionImages.forEach((imageCard2, index2) => {
            if (index !== index2) {
                imageCard2.classList.remove("active");
            }
        });

        gameContainer.classList.add("start"); // Menandakan ronde sedang berjalan

        setTimeout(() => {
            gameContainer.classList.remove("start"); // Ronde selesai, siap untuk input berikutnya jika game belum over

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

            let roundWinner = outcomes[userValue + cpuValue]; // Misal: "Kamu", "CPU", atau "Seri"

            if (roundWinner === "You") {
                userScore++;
                resultText.textContent = "You Won This Round!";
            } else if (roundWinner === "CPU") {
                cpuScore++;
                resultText.textContent = "CPU Won This Round!";
            } else {
                resultText.textContent = "Draw Round!";
            }
            
            updateScoreDisplay();

            if (!checkGameOver()) {
                // Jika game belum selesai, setelah beberapa saat, reset visual untuk ronde berikutnya
                // Ini opsional, jika Anda ingin hasil ronde tetap terlihat sampai pilihan berikutnya
                // setTimeout(() => {
                //     if (!gameContainer.classList.contains("start")) { // Hanya reset jika ronde baru belum dimulai
                //         resetRoundVisuals(); 
                //         resultText.textContent = "Pilih lagi...";
                //     }
                // }, 2000); // Tunggu 2 detik sebelum reset visual ronde
            }

        }, 2000); 
    });
});

restartGameButton.addEventListener("click", resetGame);

// Initialize game state on load
updateScoreDisplay();
resetRoundVisuals(); // Untuk memastikan tampilan awal benar
resultText.textContent = "Let's Play!";
