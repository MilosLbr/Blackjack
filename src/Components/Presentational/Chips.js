import React from 'react';
const importAll = (req) => {
    // import all chips images
    let images = {}
    
    req.keys().forEach(elem => {
        // correct the string for easier manipulation
        let correctedElem = elem.replace('./','');
        correctedElem = correctedElem.replace('.png','');
        
        images[correctedElem] = req(elem);
    
    });
    return images;
}
  
const chipsImages = importAll(require.context('../../Cards/Chips', false, /\.png$/));

const calculateAvailableChips = (currentMoney) =>{
    const chips = [1, 5, 10, 50, 100, 500, 1000, 10000]
    let possibleChips = chips.filter(elem => currentMoney>= elem);

    if(possibleChips.length > 6){
        return possibleChips.slice(-6);
    }

    return possibleChips;
}

const Chip = ({value, onClick}) => {
    let chipImage = chipsImages[value];

    return (
        <div className ='chip'  value = {value} onClick = {onClick}>
            <img alt ='chipimg' value = {value} className = 'chipImage' src ={chipImage} />
            <span value = {value}>{value}$</span>
        </div>
    )
}


const AllPlayersChips = ({cardsAreDealt, currentMoney, placeBet}) => {
    let possibleChips = calculateAvailableChips(currentMoney);
    
    let chips = possibleChips.map((elem, idx) => {
        return <Chip onClick = {placeBet} key={idx} value = {elem}/>
    })

    return(
        <div>
            {!cardsAreDealt && 
            <div className = 'allPlayersChips'>
                {chips}
            </div>
            }
            <div className = 'currentMoney'>Your current cash: {currentMoney}$</div>
        </div>
        
    )
}

export default AllPlayersChips;