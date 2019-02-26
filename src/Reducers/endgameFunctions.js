const emptyTheTable = () => {
    // clears the table and resets the state, so that the next hand can be played
    return{
        playerCards: [],
        dealerCards: [],
        playerScore: 0,
        dealerScore: 0,
        cardsAreDealt: false,
        playerTurn: true,
        firstMove: true
    }
}

const doublePot = (pot, currentMoney) => {
    // winning with blackjack   
    const doubled = pot *2;  // blackjack pays 2 to 1
    const newCurrentMoneyValue = currentMoney + pot + doubled;

    return {
        pot: 0,
        currentMoney: newCurrentMoneyValue
    }

}

const winBet = (pot, currentMoney) => {
    // winning regular bet
    const newCurrentMoneyValue = currentMoney + pot*2;

    return {
        pot: 0,
        currentMoney: newCurrentMoneyValue
    }
}

const push = (pot, currentMoney) => {
    // draw case
    const newCurrentMoneyValue = currentMoney + pot;

    return {
        pot: 0,
        currentMoney: newCurrentMoneyValue
    }

}

export{
    emptyTheTable,
    doublePot,
    winBet,
    push
}