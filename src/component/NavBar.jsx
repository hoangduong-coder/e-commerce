import './layout.scss';

import {Search, Settings} from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          className="navbar-title"
        >
          Online e-commerce
        </Typography>
        <Box sx={{flexGrow: 1}} />
        <Box className="nav-link">
          <div className="search-box">
            <div className="search-icon-wrapper">
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{'aria-label': 'search'}}
              color="inherit"
            />
          </div>
          <IconButton size="large" color="inherit">
            <Settings />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
