import { useState, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CoinsList from './CoinsList';
import { TabPanelProps } from '../types/tabpanel';


const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const CoinsTabs = ({ coins }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="List" {...a11yProps(0)} />
                    <Tab label="My watchlist" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <CoinsList coins={coins} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </Box>
    );
};

CoinsTabs.propTypes = {
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


export default CoinsTabs;