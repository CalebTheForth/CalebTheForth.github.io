let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

function buildDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({value, suit});
        }
    }
    deck = shuffle(deck);
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function startGame() {
    buildDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    displayHands();
    updateScores();
}

function playerHits() {
    playerHand.push(deck.pop());
    updateScores();
    displayHands();
    if (playerScore > 21) {
        document.getElementById('status').textContent = 'Player busts!';
        gameOver = true;
        document.getElementById('playAgain').style.display = 'block';
    }
}

function playerStands() {
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        updateScores();
    }
    if (dealerScore > 21) {
        document.getElementById('status').textContent = 'Dealer busts!';
    } else if (dealerScore >= playerScore) {
        document.getElementById('status').textContent = 'Dealer wins!';
    } else {
        document.getElementById('status').textContent = 'Player wins!';
    }
    gameOver = true;
    document.getElementById('playAgain').style.display = 'block';
}

function resetGame() {
    deck = [];
    playerHand = [];
    dealerHand = [];
    gameOver = false;
    document.getElementById('status').textContent = '';
    document.getElementById('playAgain').style.display = 'none';
    startGame();
}

function displayHands() {
    document.getElementById('playerCards').textContent = `Your cards: ${playerHand.map(card => `${card.value} of ${card.suit}`).join(', ')}`;
    document.getElementById('dealerCards').textContent = `Dealer's cards: ${dealerHand.map(card => `${card.value} of ${card.suit}`).join(', ')}`;
}

function updateScores() {
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
    document.getElementById('playerCards').textContent += ` (Score: ${playerScore})`;
    document.getElementById('dealerCards').textContent += ` (Score: ${dealerScore})`;
}

function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;
    for (let card of hand) {
        if (card.value === 'Ace') {
            aceCount++;
            score += 11;
        } else if (['Jack', 'Queen', 'King'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    }

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
}

document.addEventListener('DOMContentLoaded', startGame);