import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';

const Header = (props) => {
    const { setCoins } = props;
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
                    <SearchBar setCoins={setCoins} />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

Header.propTypes = {
    setCoins: PropTypes.func.isRequired
};

export default Header;