import * as actionTypes from "./actionTypes";

const initialState: CoinState | [] = {
  likedCoins: [],
};

const reducer = (
  state: CoinState = initialState,
  action: CoinAction
): CoinState => {
  switch (action.type) {
    case actionTypes.FETCH_COINS:
      if (state.likedCoins.findIndex((a) => a === action.likedCoin) === -1)
        return {
          ...state,
          likedCoins: [action.likedCoin, ...state.likedCoins],
        };
      return {
        ...state,
        likedCoins: state.likedCoins.filter(
          (coin) => coin !== action.likedCoin
        ),
      };
  }
  return state;
};

export default reducer;
