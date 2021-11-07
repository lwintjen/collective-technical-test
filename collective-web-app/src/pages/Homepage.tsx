import { useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { currencyApi } from '../api/currencyApi';
import LoadingScreen from '../components/LoadingScreen';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import { CoinCapURIResponse } from '../types/currency';

const Homepage = () => {
    const [coins, setCoins] = useState<CoinCapURIResponse[] | undefined>();

    useQuery('currencies', currencyApi.fetchCurrencies, {
        onSuccess: (data) => {
            setCoins(data);
        }
    });

    return (coins && coins.length > 0 ?
        <Box sx={{ flexGrow: 1 }}>
            <Header setCoins={setCoins} />
            <Tabs coins={coins} />
        </Box>
        : <LoadingScreen />);
};

export default Homepage;