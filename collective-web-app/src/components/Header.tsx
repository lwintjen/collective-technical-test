import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';

const Header = (props) => {
    const { coins, setCoins } = props;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'none' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { sm: 'block' } }}
                    >
                        CoinsFinder
                    </Typography>
                    <SearchBar coins={coins} setCoins={setCoins} />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

Header.propTypes = {
    setCoins: PropTypes.func.isRequired,
    coins: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        rank: PropTypes.string,
        symbol: PropTypes.string,
        name: PropTypes.string,
        supply: PropTypes.string,
        maxSupply: PropTypes.string,
        marketCapUsd: PropTypes.string,
        volumeUsd24Hr: PropTypes.string,
        priceUsd: PropTypes.string,
        changePercent24Hr: PropTypes.string,
        vwap24Hr: PropTypes.string,
        explorer: PropTypes.string,
        liked: PropTypes.bool,
    })).isRequired
};

export default Header;