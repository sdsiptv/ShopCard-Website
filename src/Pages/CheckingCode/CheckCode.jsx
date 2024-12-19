import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledTabs = styled(Tabs)({
    width: 'fit-content',
  '& .MuiTabs-flexContainer': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .MuiButtonBase-root': {
    minWidth: 'auto',
  },
});

const StyledTab = styled(Tab)(({ theme, selected }) => ({
  borderRadius: '50%',
  backgroundColor: selected ? '#D3D3D3' : '#FFA500', 
  color: 'black',
  margin: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: '#FF8C00',
  },
}));

export default function CheckCode() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <StyledTab label="Pizza" selected={value === 0} />
        <StyledTab label="Burger" selected={value === 1} />
        <StyledTab label="Noodles" selected={value === 2} />
        <StyledTab label="Sub sandwich" selected={value === 3} />
        <StyledTab label="Chowmein" selected={value === 4} />
        <StyledTab label="Steak" selected={value === 5} />
      </StyledTabs>
    </Box>
  );
}
