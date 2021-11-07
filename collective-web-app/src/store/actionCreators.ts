import * as actionTypes from "./actionTypes";

export const setLikedCoins = (likedCoin: string): CoinAction => ({
    type: actionTypes.FETCH_COINS,
    likedCoin,
});