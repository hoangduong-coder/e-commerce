import './layout.scss';

import {LocalShipping, Menu} from '@mui/icons-material';
import {AppBar, Box, Button, Toolbar} from '@mui/material';

const ButtonStyle = {
  textTransform: 'none',
};

const SubNavBar = () => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar variant="dense">
        <Button
          size="large"
          color="inherit"
          startIcon={<Menu />}
          style={ButtonStyle}
        >
          All categories
        </Button>
        <Button style={ButtonStyle}>New deals</Button>
        <Box sx={{flexGrow: 1}} />
        <Box className="nav-link">
          <Button
            size="large"
            color="inherit"
            startIcon={<LocalShipping />}
            style={ButtonStyle}
          >
            Deliver to Helsinki, Finland
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SubNavBar;
