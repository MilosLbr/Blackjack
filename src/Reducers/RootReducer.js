import { cards, shuffle } from '../Constants/cardObjects.js';
import { DEAL, PLACEBET, CANCELBET, HIT, STAND, DOUBLE, DEALERMOVE, ENDGAME} from '../Constants/ActionTypes.js';
import { updateObject, Hit, Double } from './herlperFunctions.js';
import { emptyTheTable, doublePot, winBet, push } from './endgameFunctions.js';

const shuffledDeck = shuffle(cards);

const initialState = {
    deck: shuffledDeck,
    playerCards: [],
    dealerCards: [],
    currentMoney: 3000,
    pot: 0,
    playerScore: 0,
    dealerScore: 0,
    cardsAreDealt: false,
    playerTurn: true,
    firstMove: true,
    charlieWin: false,
    endGameText: undefined
}


const RootReducer = (state = initialState, action)=>{
    switch(action.type){
        case PLACEBET: {
            let {pot, currentMoney} = state;

            if(action.cash <= currentMoney){
                pot += action.cash;
                currentMoney -= action.cash;

                let endGameText = undefined;
                return Object.assign({}, state, {pot, currentMoney, endGameText})
            }
            return state
        }
        case CANCELBET: {
            let {pot, currentMoney} = state;
            currentMoney += pot;
            pot = 0;

            return Object.assign({}, state, {pot, currentMoney})
        }
        case DEAL: {
            let deck = state.deck.slice();

            if(deck.length < 4){
                deck = shuffle(shuffledDeck); // reshufle cards when the deck is close to empty
            }
            let newValues = {
                deck: deck,
                playerCards: [],
                dealerCards: []
            };

            // Hit two cards for dealer an two cards for player
            for (let i = 0 ; i < 4 ; i++){
                if(i % 2 === 0){
                   newValues = Object.assign({}, newValues, Hit(newValues.deck, newValues.playerCards, 'player'));
                }else{
                    newValues = Object.assign({}, newValues, Hit(newValues.deck, newValues.dealerCards, 'dealer'));
                }
            }
            
            newValues.cardsAreDealt = true;
            newValues.firstMove = true;

            // if player got 21 (blackjack) on the deal, Stand is automatically played
            if(newValues.playerScore[1] === 21){
                newValues = Object.assign({}, newValues, {
                    playerTurn: false,
                    firstMove: false
                });
            }
            
            return updateObject(state, newValues);
        }
        case HIT: {
            let deck = state.deck.slice();
            let playerCards = state.playerCards.slice();
            if(deck.length < 2){
                deck = shuffle(shuffledDeck); // reshufle cards when the deck is close to empty
            }
            let newValues = Hit(deck, playerCards, 'player');  // draw new card from the deck

            // if player got 21, switch to dealer turn
            if(newValues.playerScore[1] === 21 || newValues.playerScore === 21){
                newValues = Object.assign({}, newValues, {
                    playerTurn: false,
                    firstMove: false
                });
            }
            // if player didn't bust and has drawn 5 cards, it is a 'Charlie win'
            else if((newValues.playerScore[1] <= 21 || newValues.playerScore <= 21) && newValues.playerCards.length === 5){
                newValues = Object.assign({}, newValues, {
                    playerTurn: false,
                    firstMove: false
                });
            }
            // if player got more than 21 , stop drawing cards and switch to dealer for endgame
            else if(newValues.playerScore > 21){
                newValues = Object.assign({}, newValues, {
                    playerTurn: false,
                    firstMove: false
                });
            }

            return updateObject(state, newValues);
        }
        case DOUBLE: {
            let {pot, currentMoney} = state;
            let deck = state.deck.slice();
            let playerCards = state.playerCards.slice();

            if(pot <= currentMoney){
                if(deck.length < 2){
                    deck = shuffle(shuffledDeck); // reshufle cards when the deck is close to empty
                }
                
                let newValues = Double(currentMoney, pot, deck, playerCards);
                
                return updateObject(state, newValues);
                
            }else{
                alert('Not enough cash to double!');
                return state;
            }           
        }
        case STAND: {
            return Object.assign({}, state, {
                playerTurn: false,
                firstMove: false
            })
        }
        case DEALERMOVE: {
            let deck = state.deck.slice();
            let dealerCards = state.dealerCards.slice();

            if(deck.length < 2){
                deck = shuffle(shuffledDeck); // reshufle cards when the deck is close to empty
            }

            let newValues = Hit(deck, dealerCards, 'dealer');
            
            return updateObject(state, newValues);
            
        }
        case ENDGAME: {
            // action.comparisonResult.result can be: blackjack | win | push | lose  
            
            const {pot, currentMoney} = state;

            switch (action.comparisonResult.result){
                case "blackjack": {
                    let newValues = doublePot(pot, currentMoney);
                    newValues = Object.assign({}, newValues, emptyTheTable(), {
                        endGameText: action.comparisonResult.text
                    })
                    return updateObject(state, newValues)
                }
                case "win": {
                    let newValues = winBet(pot, currentMoney);
                    newValues = Object.assign({}, newValues, emptyTheTable(), {
                        endGameText: action.comparisonResult.text
                    });
                    return updateObject(state, newValues)
                }
                case "lose": {
                    let newValues = {
                        pot: 0
                    }
                    newValues = Object.assign({}, newValues, emptyTheTable(), {
                        endGameText: action.comparisonResult.text
                    });
                    return updateObject(state, newValues)
                }
                case "push": {
                    let newValues = push(pot, currentMoney);
                    newValues = Object.assign({}, newValues, emptyTheTable(), {
                        endGameText: action.comparisonResult.text
                    });
                    return updateObject(state, newValues);
                }
                default: {
                    return state;
                }
            }
        
        }
        default:
            return state;
    }
}

export default RootReducer;