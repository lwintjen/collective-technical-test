import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CoinsList = ({ coins }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Rank</TableCell>
                        <TableCell align="right">Symbol</TableCell>
                        <TableCell align="right">Change on the last 24hrs</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {coins.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.rank}</TableCell>
                            <TableCell align="right">{row.symbol}</TableCell>
                            <TableCell align="right" sx={{ color: row.changePercent24Hr[0] === '-' ? 'red' : 'green' }}>{row.changePercent24Hr}%</TableCell>
                            <TableCell align="right">${Number(row.priceUsd).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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