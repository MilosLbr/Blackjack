const calculateScore = (cardsToEvaluate) => {  // score of cards in a hand
    const calculations = [];
    let values = cardsToEvaluate.map(elem => elem.value);
    calculations.push(values.reduce((total, sum) => total + sum));

    if(values.includes(1)){ 
        // ace card can have value 1 and 11. turn aces to 11 and calculate again
        for (let i = 0 ; i < values.length; i++){
            if(values[i] === 1){
                values[i] = 11;

                calculations.push(values.reduce((total, sum) => total + sum));
            }
        }
    }
    let filteredCalculations = calculations.filter(elem => elem <= 21);
    
    // filteredCalculations can be returned as an array or an integer depending on whether there is an Ace (1 & 11) in a hand
    if(filteredCalculations.length > 0){
        if(filteredCalculations.length > 1){
            return filteredCalculations;
        }else{
            return Math.max(...filteredCalculations)
        }
    }else{ // the case when score is over 21
        return Math.min(...calculations)
    }

}

export {
    calculateScore
}
