// dinamicaly create all 52 cards
const cards = [];  // array that will hold the cards
const suits = ["S", "H", "C", "D"];  // spades, hearts, clubs, diamonds
const extension = '.svg';


class cardObject {
    constructor(value, symbol){
        this.value = value;
        this.symbol = symbol
    }
}

for (let i = 1; i <= 14; i++){
    switch(i){
        case 1:{
            const value = 1;
            for (let j = 0; j < 4; j++){
                const symbol = 'ace' + suits[j] + extension;

                const card = new cardObject(value, symbol);
                cards.push(card);
            }
            break;
        }
        case 12:{
            const value = 10;
            for (let j = 0; j < 4; j++){
                const symbol = 'jack' + suits[j] + extension;

                const card = new cardObject(value, symbol);
                cards.push(card);
            }
            break;
        }
        case 13:{
            const value = 10;
            for (let j = 0; j < 4; j++){
                const symbol = 'queen' + suits[j] + extension;

                const card = new cardObject(value, symbol);
                cards.push(card);
            }
            break;            
        }
        case 14:{
            const value = 10;
            for (let j = 0; j < 4; j++){
                const symbol = 'king' + suits[j] + extension;

                const card = new cardObject(value, symbol);
                cards.push(card);
            }
            break;
        }
        case 11:{
            break;
        }
        default:
            const value = i;
            for (let j = 0; j < 4; j++){
                const symbol = i + suits[j] + extension;

                const card = new cardObject(value, symbol);
                cards.push(card);
            }
            break;
    }
}


function shuffle(array) { // source : https://bost.ocks.org/mike/shuffle/
    var m = array.length, t, i;
    var arrayCopy = array.slice();
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = arrayCopy[m];
      arrayCopy[m] = arrayCopy[i];
      arrayCopy[i] = t;
    }
  
    return arrayCopy;
}

export {
    cards,
    shuffle
}