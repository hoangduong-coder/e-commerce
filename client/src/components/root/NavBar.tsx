import "./layout.scss"

import { AccountCircle, Search, ShoppingCart } from "@mui/icons-material"
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material"

import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" noWrap component="div">
          <Link to="/" className="navbar-home-link">
            Online e-commerce
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box className="nav-link">
          <div className="search-box">
            <div className="search-icon-wrapper">
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              color="inherit"
            />
          </div>
          <IconButton size="large" color="inherit">
            <ShoppingCart />
          </IconButton>
          <Button size="large" color="inherit" startIcon={<AccountCircle />}>
            Log in
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
