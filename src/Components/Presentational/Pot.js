import React from 'react';

const Pot = ({pot, cancelBet, cardsAreDealt}) => {
    return(
        <div className ='pot'>
            <div>{pot > 0 && pot}$</div>
            
            {(pot > 0 && !cardsAreDealt) && <button onClick = {cancelBet} className = 'cancelBet' title = 'Cancel bet'>x</button>} 
        </div>
    )
}

export default Pot;