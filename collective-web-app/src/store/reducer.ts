import * as actionTypes from "./actionTypes";

const initialState: CoinState | [] = {
    coins: []
};

const reducer = (
    state: CoinState = initialState,
    action: CoinAction
): CoinState => {
    switch (action.type) {
        case actionTypes.FETCH_COINS:
            console.log(action.coins[0]);
            return { ...state, coins: action.coins };
    }
    return state;
};

export default reducer;