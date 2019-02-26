import { PLACEBET } from '../Constants/ActionTypes.js';

export const PlaceBet = (cash) => ({
    type: PLACEBET,
    cash
})