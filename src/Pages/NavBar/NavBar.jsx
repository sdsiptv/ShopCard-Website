import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Body from '../Body/body';
import './NavBar.css';
import OfferDetails from '../OfferDetails/OfferDetails';
import ShopDetails from '../ShopDetails/ShopDetails';

export default function NavBar() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'Background' }}>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                            TabIndicatorProps={{ style: { display: 'none' } }}
                            sx={{
                                display: 'flex', justifyContent: 'space-around',
                                '@media (max-width: 600px)': {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }
                            }}

                        >
                            <Tab
                                label="PRODUCTS"
                                value="1"
                                sx={{
                                    width: "200px",
                                    borderRadius: '50px',
                                    backgroundColor: '#fdfefe',
                                    fontSize: "16px",
                                    color: '#FFB20E',
                                    border: "2px solid transparent", 
                                    borderColor: "#FFB20E",
                                    '&.Mui-selected': {
                                        backgroundColor: '#FFB20E',
                                        color: '#fdfefe',
                                        border: "2px solid #FFB20E",
                                    },
                                    '@media (max-width: 600px)': {
                                        width: "130px",
                                        fontSize: "14px",
                                    }
                                }}
                            />

                            <Tab
                                label="OFFERS"
                                value="2"
                                sx={{
                                    width: "200px",
                                    borderRadius: '50px',
                                    outline: "auto",
                                    border: "2px solid transparent", 
                                    borderColor: "#FFB20E",
                                    backgroundColor: '#fdfefe',
                                    fontSize: "16px",
                                    color: '#FFB20E',
                                    '&.Mui-selected': {
                                        backgroundColor: '#FFB20E',
                                        color: '#fdfefe',
                                        border: "2px solid #FFB20E",
                                    },
                                    '@media (max-width: 600px)': {
                                        width: "130px",
                                        fontSize: "14px",
                                    }
                                }}
                            />
                            <Tab
                                label="DETAILS"
                                value="3"
                                sx={{
                                    width: "200px",
                                    borderRadius: '50px',
                                    border: "2px solid transparent", 
                                    outline: "auto",
                                    borderColor: "#FFB20E",
                                    backgroundColor: '#fdfefe',
                                    fontSize: "16px",
                                    color: '#FFB20E',
                                    '&.Mui-selected': {
                                        backgroundColor: '#FFB20E',
                                        color: '#fdfefe',
                                        border: "2px solid #FFB20E",
                                    },
                                    '@media (max-width: 600px)': {
                                        width: "130px",
                                        fontSize: "14px",
                                    }
                                }}
                            />
                        </TabList>
                    </div>
                </Box>
                <TabPanel value="1">
                    <div className="mt-2">
                        <Body />
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <OfferDetails />
                </TabPanel>
                <TabPanel value="3">
                    <ShopDetails />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
