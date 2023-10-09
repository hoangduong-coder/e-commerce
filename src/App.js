import './App.css';

import {SearchIcon, Settings} from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Search,
  SearchIconWrapper,
  Toolbar,
  Typography,
} from '@mui/material';

function App () {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h3"
            noWrap
            component="div"
            className="navbar-title"
          >
            Online e-commerce
          </Typography>
          <Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <InputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
              />
            </Search>
            <IconButton size="large" color="inherit">
              <Settings />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
