/* eslint-disable react-hooks/exhaustive-deps */

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

import { Link } from "react-router-dom"
import { useAppSelector } from "reduxStore/hooks"

const NavBar = () => {
  const orders = useAppSelector((state) => state.orders.all)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" noWrap component="div">
          <Link to="/" className="no-underline-link">
            Online e-commerce
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box className="nav-link">
          <Link to="/orders" className="no-underline-link">
            <IconButton size="large" color="inherit">
              {orders.length > 0 ? (
                <Badge badgeContent={orders.length} color="error">
                  <ShoppingCart />
                </Badge>
              ) : (
                <ShoppingCart />
              )}
            </IconButton>
          </Link>
          <Link to="/signin" className="no-underline-link">
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
