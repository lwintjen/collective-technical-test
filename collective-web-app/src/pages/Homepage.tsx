import { useQuery } from 'react-query';
import { currencyApi } from '../api/currencyApi';
import LoadingScreen from '../components/LoadingScreen';
import { Box } from '@mui/material';
import Header from '../components/Header';
import CoinsList from '../components/CoinsList';

const Homepage = () => {
    const { data } = useQuery('currencies', currencyApi.fetchCurrencies, {
        refetchInterval: 10000,
        refetchIntervalInBackground: true,
    });

    return (data ?
        <Box sx={{ flexGrow: 1 }}>
            <Header />
            <CoinsList coins={data} />
        </Box>
        : <LoadingScreen />);
};

export default Homepage;