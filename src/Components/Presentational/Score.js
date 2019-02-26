import React from 'react';

const Score = ({score, playerTurn}) => {
    let className = 'score ';
    let containerClass ;
    let scoreArray =[];

    if(typeof(score) === 'string'){
        scoreArray = score.split('/');
        scoreArray = scoreArray.map(elem => parseInt(elem));
    }

    if(playerTurn === true){
        className += 'hidden '
    }
    if(scoreArray[1] < 21 || score < 21){
        className += 'u21Score ';
    }else if(scoreArray[1] === 21 || score === 21){
        className += 'e21Score ';
        containerClass = 'e21ScoreContainer'
    }else{
        className += 'o21Score ';
    }

    return(
        <div className = {containerClass}>
            <div className = {className}>{score}</div>
        </div>
        
    )
}

export default Score;