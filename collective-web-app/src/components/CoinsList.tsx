import { Dispatch } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from "react-redux";
import store from '../store';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { formatNumber } from '../utils/formatNumber';
import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { fetchCoins } from "../store/actionCreators";
import { CoinCapURIResponse } from 'src/types/currency';

const useStyles = makeStyles({
    root: {
        '& .super-app.negative': {
            color: 'rgba(157, 255, 118, 0.49)',
            fontWeight: '600',
        },
        '& .super-app.positive': {
            color: '#d47483',
            fontWeight: '600',
        },
    },
});

const formatRows = (storeCoins: ICoin[], coins: CoinCapURIResponse[], displayAll: boolean): GridRowsProp => {
    const res = coins.map(c => {
        return {
            "name": c.name,
            "id": c.id,
            "rank": Number(c.rank),
            "symbol": c.symbol,
            "changePercent24Hr": formatNumber(c.changePercent24Hr),
            "priceUsd": Number(c.priceUsd).toFixed(2),
            "supply": Number(c.supply).toFixed(2),
            "liked": storeCoins.find(coin => coin.id === c.id).liked,
        };
    });
    if (!displayAll) return res.filter(c => c.liked);
    return res;
};

const CoinsList = (props) => {
    console.log('RENDER');
    const { coins, displayAllItems, setCoins } = props;
    const storeCoins = store.getState().coins;
    const classes = useStyles();
    const dispatch: Dispatch<any> = useDispatch();

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150, sortable: false },
        { field: 'id', headerName: 'Id', width: 150, align: 'center', headerAlign: 'center', sortable: false },
        { field: 'rank', headerName: 'Rank', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'symbol', headerName: 'Symbol', width: 150, align: 'center', headerAlign: 'center', sortable: false },
        {
            field: 'changePercent24Hr', headerName: 'Rate (last 24hrs)', width: 200, align: 'center', headerAlign: 'center', cellClassName: (params: GridCellParams<string>) =>
                clsx('super-app', {
                    negative: params.value[0] !== '-',
                    positive: params.value[0] === '-',
                }),
        },
        { field: 'priceUsd', headerName: 'Price ($)', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'supply', headerName: 'Supply', width: 200, align: 'center', headerAlign: 'center', disableColumnMenu: true, sortable: false },
        {
            field: 'liked', headerName: 'Liked', width: 150, align: 'center', headerAlign: 'center',
            disableColumnMenu: true, sortable: false, renderCell: (params) => {
                const isLiked = params.getValue(params.row.id, 'liked');
                return (
                    <Box
                        sx={{ display: 'flex', cursor: "pointer", alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => {
                            params.row.liked = !isLiked;
                            storeCoins.find(c => c.id === params.row.id).liked = !isLiked;
                            console.log(storeCoins.find(c => c.id === params.row.id).liked);
                            dispatch(fetchCoins(coins));
                            setCoins([...coins]);
                        }}
                    >
                        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </Box>
                );
            }
        },
    ];

    return (
        <div style={{ display: 'flex', height: '100%' }} className={classes.root}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid autoHeight rows={formatRows(storeCoins, coins, displayAllItems)} columns={columns} />
            </div>
        </div>
    );
};

CoinsList.propTypes = {
    setCoins: PropTypes.func.isRequired,
    displayAllItems: PropTypes.bool.isRequired,
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

export default CoinsList;