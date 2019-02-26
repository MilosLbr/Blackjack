import React from 'react';

const EndGameResult = ({endGameText}) => {
    
    return(
        <div className = 'endGameResult'>
        {endGameText !== undefined  && <div className = 'endGameText'>{endGameText}</div>}
        </div>
    )
}

export default EndGameResult;