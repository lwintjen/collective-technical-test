interface ICoin {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    explorer: string;
    liked: boolean;
}

type CoinState = {
    coins: ICoin[];
};

type CoinAction = {
    type: string;
    coin?: ICoin;
    coins?: ICoin[];
};

type DispatchType = (args: CoinAction) => CoinAction;