import { ENDGAME } from  '../Constants/ActionTypes.js';

export const EndGame = (comparisonResult) =>( {
    type : ENDGAME,
    comparisonResult
})

/*  comparisonResult will be an object with two properites:
    result: blackjack, win, lose or push,
    text: for example player had blackjack, or player busted etc...
*/