import { useQuery } from 'react-query';
import { currencyApi } from '../api/currencyApi';
import LoadingScreen from '../components/LoadingScreen';


const Homepage = () => {
    const { data } = useQuery('currencies', currencyApi.fetchCurrencies, {
        refetchInterval: 10000,
        refetchIntervalInBackground: true,
    });

    return (data ? <>ok</> : <LoadingScreen />);
};

export default Homepage;