import React from 'react';

const GameRules = () =>{
    return(
        <div id="tooltip">
          <i className="fas fa-info-circle info"></i>
          <div id = 'tooltipText'>
              <p>Dealer must draw to 16 and stand on all 17's.</p>
              <p>Blackjack pays 2 to 1.</p>
              <p>There is a Charlie Win option: Player wins if he draws five cards without busting, irrespective of the dealer's hand.</p>
          </div>
        </div>
    )
}

export default GameRules;