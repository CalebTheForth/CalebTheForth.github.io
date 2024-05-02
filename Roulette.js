let bet = -1;

function placeBet() {
    const betInput = document.getElementById('betNumber');
    bet = parseInt(betInput.value);
    if (bet < 0 || bet > 36) {
        alert("Invalid bet. Please choose a number between 0 and 36.");
        return;
    }
    alert(`You have placed your bet on number ${bet}.`);
}

function spinWheel() {
    const result = Math.floor(Math.random() * 37); // Generates a random number between 0 and 36
    const resultParagraph = document.getElementById('result');

    if (bet === -1) {
        alert("Please place your bet first.");
        return;
    }

    resultParagraph.textContent = `The wheel landed on: ${result}`;
    checkWin(result);
}

function checkWin(result) {
    if (result === bet) {
        alert("Congratulations! You won!");
    } else {
        alert("Sorry, you lost. Try again!");
    }
    bet = -1; // Reset bet
}
