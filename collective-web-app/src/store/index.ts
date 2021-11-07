import thunk from "redux-thunk";
import { createStore, applyMiddleware, Store } from "redux";
import reducer from "./reducer";

const store: Store<CoinState, CoinAction> & {
    dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

export default store;