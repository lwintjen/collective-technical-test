import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { currencyApi } from '../api/currencyApi';
import store from '../store';
import { CoinCapURIResponse } from '../types/currency';

interface Props {
    setCoins: (coins: CoinCapURIResponse[]) => void;
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

const SearchBar: React.FC<Props> = (props) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const { setCoins } = props;

    const refetch = async () => {
        const data = await currencyApi.searchCurrencies(searchValue);
        const res = data.map(newCoin => {
            const likedCoins = store.getState().likedCoins;
            return { liked: likedCoins.findIndex(coinID => coinID === newCoin.id) > 0, ...newCoin };
        });
        setCoins(res);
    };

    const handleChange = async (e) => {
        setSearchValue(e.target.value);
        if (e.target.value !== "") {
            await refetch();
            return;
        }
        const data = await currencyApi.fetchCurrencies();
        const res = data.map(newCoin => {
            const likedCoins = store.getState().likedCoins;
            return { liked: likedCoins.findIndex(coinID => coinID === newCoin.id) > 0, ...newCoin };
        });
        setCoins(res);
    };

    return (<Search>
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search a currency…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue}
            onChange={handleChange}
        />
    </Search>);
};

export default SearchBar;