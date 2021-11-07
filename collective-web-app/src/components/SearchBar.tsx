import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { currencyApi } from '../api/currencyApi';
import { CoinCapURIResponse } from 'src/types/currency';

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

const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const { setCoins } = props;

    const { refetch } = useQuery('search-currencies', async () =>
        await currencyApi.searchCurrencies(searchValue)
        , {
            refetchOnWindowFocus: false,
            enabled: false, // turned off by default, manual refetch is needed
            onSuccess: (data) => {
                setCoins(data);
            }
        });

    const handleChange = async (e) => {
        setSearchValue(e.target.value);
        console.log(e.target.value);
        if (e.target.value !== "") {
            refetch();
            return;
        }
        const coins = await currencyApi.fetchCurrencies();
        setCoins(coins);
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

SearchBar.propTypes = {
    setCoins: PropTypes.func.isRequired
};

export default SearchBar;