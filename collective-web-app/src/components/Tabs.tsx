import { useState, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CoinsList from './CoinsList';
import { TabPanelProps } from '../types/tabpanel';
import { CoinCapURIResponse } from '../types/currency';

interface Props {
    coins: CoinCapURIResponse[];
    setCoins: (coins: CoinCapURIResponse[]) => void;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index: number) => {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
};

const CoinsTabs: React.FC<Props> = (props) => {
    const { coins, setCoins } = props;
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="coins tab">
                    <Tab label="List" {...a11yProps(0)} />
                    <Tab label="My watchlist" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <CoinsList coins={coins} displayAllItems={true} setCoins={setCoins} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CoinsList coins={coins} displayAllItems={false} setCoins={setCoins} />
            </TabPanel>
        </Box>
    );
};

export default CoinsTabs;