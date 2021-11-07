import { useState, Dispatch } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from "react-redux";
import { fetchCoins } from "../store/actionCreators";
import { currencyApi } from '../api/currencyApi';
import LoadingScreen from '../components/LoadingScreen';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import { CoinCapURIResponse } from '../types/currency';
import { useEffect } from 'react';
import { mapICoin } from 'src/store/actionTypes';

const Homepage = () => {
    const [coins, setCoins] = useState<CoinCapURIResponse[] | undefined>();
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        (async () => {
            const coins = await currencyApi.fetchCurrencies();
            dispatch(fetchCoins(mapICoin(coins)));
            setCoins(coins);
        })();
    }, []);

    return (coins && coins.length > 0 ?
        <Box sx={{ flexGrow: 1 }}>
            <Header coins={coins} setCoins={setCoins} />
            <Tabs coins={coins} setCoins={setCoins} />
        </Box>
        : <LoadingScreen />);
};

export default Homepage;