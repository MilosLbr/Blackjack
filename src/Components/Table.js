import React from 'react';
import { connect } from 'react-redux';
import { CancelBet } from '../Actions/CancelBet.js';
import DealerCards from './DealerCards.js';
import PlayerCards from './PlayerCards.js';
import Pot from './Presentational/Pot.js';
import EndGameResult from './Presentational/EndGameResult.js';

const mapStateToProps = (state) => ({
  pot: state.pot,
  cardsAreDealt: state.cardsAreDealt,
  endGameText: state.endGameText
});

const mapDispatchToProps = dispatch => ({
  cancelBet : () => dispatch(CancelBet())
})


const Table = ({pot, cancelBet, cardsAreDealt, endGameText}) => {
    return(
        <div className = 'table'>
            <DealerCards/>
            { pot > 0 && <Pot pot = {pot} cancelBet = {cancelBet} cardsAreDealt = {cardsAreDealt}/>}
            {endGameText && <EndGameResult endGameText = {endGameText}/>}
            <PlayerCards/>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);