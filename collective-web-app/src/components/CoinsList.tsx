import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { formatNumber } from '../utils/formatNumber';
import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { CoinCapURIResponse } from 'src/types/currency';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150, sortable: false },
    { field: 'id', headerName: 'Id', width: 150, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'rank', headerName: 'Rank', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'symbol', headerName: 'Symbol', width: 200, align: 'center', headerAlign: 'center', sortable: false },
    {
        field: 'changePercent24Hr', headerName: 'Rate (last 24hrs)', width: 200, align: 'center', headerAlign: 'center', cellClassName: (params: GridCellParams<string>) =>
            clsx('super-app', {
                negative: params.value[0] !== '-',
                positive: params.value[0] === '-',
            }),
    },
    { field: 'priceUsd', headerName: 'Price ($)', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'supply', headerName: 'Supply', width: 200, align: 'center', headerAlign: 'center', disableColumnMenu: true, sortable: false },
];

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

const formatRows = (coins: CoinCapURIResponse[]): GridRowsProp => {
    return coins.map(c => {
        return {
            "name": c.name,
            "id": c.id,
            "rank": Number(c.rank),
            "symbol": c.symbol,
            "changePercent24Hr": formatNumber(c.changePercent24Hr),
            "priceUsd": Number(c.priceUsd).toFixed(2),
            "supply": Number(c.supply).toFixed(2),
        };
    });
};

const CoinsList = ({ coins }) => {
    const classes = useStyles();

    return (
        <div style={{ display: 'flex', height: '100%' }} className={classes.root}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid autoHeight rows={formatRows(coins)} columns={columns} />
            </div>
        </div>
    );
};

CoinsList.propTypes = {
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

    })).isRequired
};

export default CoinsList;