import "./layout.scss"

import { AccountCircle, ShoppingCart } from "@mui/icons-material"
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"

import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"

const NavBar = () => {
  const [cookies] = useCookies(["orders"])

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
          <IconButton size="large" color="inherit">
            {cookies.orders?.length > 0 ? (
              <Badge badgeContent={cookies.orders.length} color="error">
                <ShoppingCart />
              </Badge>
            ) : (
              <ShoppingCart />
            )}
          </IconButton>
          <Link to="/signin" className="navbar-home-link">
            <Button size="large" color="inherit" startIcon={<AccountCircle />}>
              Log in
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
