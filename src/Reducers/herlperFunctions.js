import { calculateScore } from '../Constants/calculateScore.js';

const importAll = (req) => {
    // import all card images
    let images = {}
    
    req.keys().forEach(elem => {
    // corecting filename for each file, adapting it for later use
      let corectedElem = elem.replace('./','');
      corectedElem = corectedElem.replace('_of_', '');
      corectedElem = corectedElem.replace('spades', 'S');
      corectedElem = corectedElem.replace('clubs', 'C');
      corectedElem = corectedElem.replace('diamonds', 'D');
      corectedElem = corectedElem.replace('hearts', 'H');
  
     images[corectedElem] = req(elem);
    
    });
    return images;
}
  
const images = importAll(require.context('../Cards/SVG-cards-1.3', false, /\.svg$/));

const updateObject = (oldObject, newValues) => {  // source Redux documentation
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return Object.assign({}, oldObject, newValues)
}

const Hit = (deck, playerCards, currentPlayer) => {  
    // draws a card from the deck
    let playerScore, dealerScore;

    deck = deck.slice();  // make a copy
    playerCards = playerCards.slice(); 

    let hitCard = {src: images[deck[0].symbol], card: deck[0]};  // first card from deck

    deck.shift();
    playerCards.push(hitCard);

    if(currentPlayer === 'player'){ // drawing for player
        const cardsToEvaluate = playerCards.map(elem => {return elem.card})
        playerScore = calculateScore(cardsToEvaluate);

        const newValues = {
            deck,
            playerCards,
            playerScore,
            firstMove: false
        }

        return newValues;
    }else if(currentPlayer === 'dealer'){  // drawing for dealer
        const cardsToEvaluate = playerCards.map(elem => {return elem.card})
        dealerScore = calculateScore(cardsToEvaluate);
        let dealerCards = playerCards;

        const newValues = {
            deck,
            dealerCards,
            dealerScore
        }

        return newValues;
    }
}

const Double = (currentMoney, pot, deck, playerCards) => { // double down
    let newCurrentMoneyVal = currentMoney - pot;
    let newPotVal = pot + pot;

    let newValues = Hit(deck, playerCards, 'player');
    newValues = Object.assign({}, newValues, {
        currentMoney: newCurrentMoneyVal,
        pot: newPotVal,
        playerTurn: false,
        firstMove: false
    });

    return newValues;
}


const blackjack = (score, cards) => {
    // returns boolean value
    return  score === 21 && cards.length === 2;
}

const compareScores = (playerScore, dealerScore, playerCards, dealerCards) => {
    // score value can be an array or an integer, depending on whether there is an Ace in a hand (Ace = 1 & 11)
    // choose the best possible score for the player 
    playerScore = playerScore.length === 2? playerScore[1] : playerScore;
    dealerScore = dealerScore.length === 2? dealerScore[1] : dealerScore;
    
    if(playerCards.length === 5 && playerScore <= 21 ){
        // if player has drawn five cards without busting it is a Charlie win, irrespective of the dealer's hand
        const text = 'Charlie Win!!!';
        return {
            result: 'win',
            text
        }
    }
    else if(blackjack(dealerScore, dealerCards) && blackjack(playerScore, playerCards)){
        const text = 'Both players had Blackjack. Push.';
        return {
            result:'push',
            text
        };
    }else if(playerScore === 21 && dealerScore === 21){
        if(blackjack(playerScore, playerCards)){
            const text = 'Player won because of blackjack: '+ playerScore + ' = ' + dealerScore + '.';
            return {
                result: 'win',
                text
            };
        }else if(blackjack(dealerScore, dealerCards)){
            const text = 'Dealer won because of blackjack: ' + playerScore + ' = ' + dealerScore + '.';
            return {
                result:'lose',
                text
            };
        }else{
            const text = 'Neither player had blackjack, it is a draw. Push.'
            return {
                result: 'push',
                text
            };
        }
    }else if(blackjack(dealerScore, dealerCards)){
        const text = 'Dealer Blackjack, player lost.';
        return {
            result:'lose',
            text
        };
    }else if(blackjack(playerScore, playerCards)){
        const text = 'Player got Blackjack!!!';
        return {
            result: 'blackjack',
            text
        }
    }else if(playerScore > 21){
        const text = 'Player busted: ' + playerScore + '.';
        return {
            result:'lose',
            text
        }
    }else if(dealerScore > 21){
        const text = 'Dealer busted: ' + dealerScore + '. Player wins.'
        return {
            result :'win',
            text
        }
    }else if(playerScore > dealerScore){
        const text = 'Player won, better score: ' + playerScore + ' > ' + dealerScore + '.';
        return {
            result: 'win',
            text
        }
    }else if(dealerScore > playerScore){
        const text = 'Dealer won, better score: ' + dealerScore + ' > ' + playerScore + '.';
        return { 
            result:'lose',
            text
        }
    }else if(dealerScore === playerScore){
        const text = 'Equal scores: ' + playerScore + ' = ' + dealerScore + '. Push.'
        return {
            result:'push',
            text
        }
    }else{
        console.log('error')
        return '---'
    }
}

export{
    updateObject,
    Hit,
    Double,
    compareScores
}