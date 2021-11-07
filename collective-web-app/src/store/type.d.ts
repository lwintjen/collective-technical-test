type CoinState = {
  likedCoins: string[];
};

type CoinAction = {
  type: string;
  likedCoin: string;
};

type DispatchType = (args: CoinAction) => CoinAction;
