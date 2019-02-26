import React from 'react';
import { compareScores } from '../../Reducers/herlperFunctions.js';
import Score from './Score.js';

const importImage = (req) => { // import faceDown card image
    let image = {}
    
    req.keys().forEach(elem => {
        // correct the string for easier manipulation
        let correctedElem = elem.replace('./','');
        correctedElem = correctedElem.replace('.jpg','');
        
        image[correctedElem] = req(elem);
    
    });
    return image;
}
const faceDownCard = importImage(require.context('../../Cards/FaceDown', false, /\.jpg$/));


const Card = ({imageSource, hidden}) => {
    let className = 'cardImage ';
    let backOfTheCard;
    
    if(hidden === true){
        className += 'faceDown ';  // hide dealer's second card
        backOfTheCard = <img src = {faceDownCard.faceDownCard} alt='back of the card' className = 'cardImage '/>
        
    }else{
        backOfTheCard = <img src = {faceDownCard.faceDownCard} alt='back of the card' className = 'cardImage backOfTheCardRotate'/>
    }
    return(
        <div className = 'cardDiv '>
            <div className = 'cardImageContainer'>
                <img src={imageSource} alt='card' className = {className} draggable ='false'/>
                {backOfTheCard}
            </div>
            
        </div>
    )
}



class AllCardsContainer extends React.Component{
    // this component renders both player's and dealer's cards. When the player finishes he's turn, the component plays dealer's moves in componentDidUpdate, dispatching actions with timeout for prettier UI.
    constructor(props) {
        super(props);
        this.timeouts = [];
        this.componentCleanup = this.componentCleanup.bind(this);
    }
    componentDidUpdate(){
        let {player, cardsAreDealt, playerTurn, dealerMove, dealerCards, dealerScore, playerCards, playerScore, endGame} = this.props;
        let comparisonResult = '';

        if(cardsAreDealt){
            if(player === 'dealer' && !playerTurn){
                // playing the dealer's moves 
                // dealer must draw to 16 and stand on all 17's

                if(playerScore > 21){
                    // player busted, dealer doesn't draw cards
                    comparisonResult = compareScores(playerScore, dealerScore, playerCards, dealerCards);
                    this.timeouts[0] = setTimeout(() => {
                        endGame(comparisonResult);
                    }, 1800);

                }else if(playerScore[1] === 21 && playerCards.length === 2){
                    // player got blackjack on first two dealt cards , dealer doesn't draw cards, just compare scores
                    comparisonResult = compareScores(playerScore, dealerScore, playerCards, dealerCards);
                    this.timeouts[1] = setTimeout(() => {
                        endGame(comparisonResult);
                    }, 2200);

                }else if(compareScores(playerScore, dealerScore, playerCards, dealerCards).text === 'Charlie Win!!!'){
                    // player has 5 cards without busting, it is a Charlie win, irrespective of the dealer's hand
                    comparisonResult = compareScores(playerScore, dealerScore, playerCards, dealerCards);
                    this.timeouts[2] = setTimeout(() => {
                        endGame(comparisonResult);
                    }, 2200);

                }
                else if(dealerCards.length === 2 && dealerScore[1] === 21){ 
                    // dealer has blackjack
                    comparisonResult = compareScores(playerScore, dealerScore, playerCards, dealerCards);
                    this.timeouts[0] = setTimeout(() => {
                        endGame(comparisonResult);
                    }, 1800);

                }else if(dealerScore[1] <= 16 || dealerScore <= 16){
                    // draw one card for the dealer
                    this.timeouts[1] = setTimeout(() => {
                        dealerMove();
                    }, 1200);
                }else{
                    // compare scores and end game
                    comparisonResult = compareScores(playerScore, dealerScore, playerCards, dealerCards);
                    this.timeouts[2] = setTimeout(() => {
                        endGame(comparisonResult);
                    }, 2000);
                }
            }
        }
    }

    // cleaning up the component on unmount
    componentDidMount(){
        window.addEventListener('beforeunload', this.componentCleanup)
    }
    componentCleanup(){
        this.timeouts.map(elem => clearInterval(elem)); 
    }
    componentWillUnmount(){
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup); 
    }
    
    render(){
        let {cardsAreDealt, src, playerTurn, score } = this.props;
        let cards;
        if(cardsAreDealt){
            cards = src.map((elem, ind) => {
                if(playerTurn === true && ind === 1){
                    return <Card imageSource = {elem.src} key = {ind} hidden = {true}/>
                }else{
                    return <Card imageSource = {elem.src} key = {ind} />
                }
            });
            if(score.length > 1){
                score = score[0] + '/' + score[1];
            }
        }
        
        return(
            <div className = 'cardsAndScoreContainer'>
                <div className = 'cardsOnTable'>{cards}</div>
               { score !== 0  && <Score score={score} playerTurn = {playerTurn}/>}
            </div>
        );
    }
    
}


export default AllCardsContainer;