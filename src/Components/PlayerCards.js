import AllCardsContainer from './Presentational/Cards.js';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    src: state.playerCards,
    cardsAreDealt: state.cardsAreDealt,
    player: 'player',
    score: state.playerScore
});


const PlayerCards = connect(mapStateToProps, null) (AllCardsContainer);

export default PlayerCards;