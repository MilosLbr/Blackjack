import {connect} from 'react-redux';
import AllPlayersChips from './Presentational/Chips.js';
import { PlaceBet } from '../Actions/PlaceBet.js';

const mapStateToProps = state => ({
    currentMoney: state.currentMoney,
    cardsAreDealt: state.cardsAreDealt
})

const mapDispatchToProps = dispatch => ({
    placeBet : (e) => {
        const cash = parseInt(e.target.getAttribute('value'));
        dispatch(PlaceBet(cash));
    }
})

const ChipsContainer = connect(mapStateToProps, mapDispatchToProps)(AllPlayersChips);

export default ChipsContainer;