import AllCardsContainer from './Presentational/Cards.js';
import { DealerMove } from '../Actions/DealerMove.js';
import { EndGame } from '../Actions/EndGame.js';
import {connect} from 'react-redux';


const mapStateToProps = state => ({
    src: state.dealerCards,
    cardsAreDealt: state.cardsAreDealt,
    player: 'dealer',
    firstMove: state.firstMove,
    playerTurn: state.playerTurn,
    score: state.dealerScore,
    dealerCards: state.dealerCards,
    playerCards: state.playerCards,
    dealerScore: state.dealerScore,
    playerScore: state.playerScore
});

const mapDispatchToProps = dispatch => ({
    dealerMove: (move) => dispatch(DealerMove(move)),
    endGame: (comparisonResult) => dispatch(EndGame(comparisonResult))
})


const DealerCards = connect(mapStateToProps, mapDispatchToProps)(AllCardsContainer);

export default DealerCards;