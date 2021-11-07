import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';
import { CoinCapURIResponse } from '../types/currency';

interface Props {
    setCoins: (coins: CoinCapURIResponse[]) => void;
}

const Header: React.FC<Props> = (props) => {
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

export default Header;