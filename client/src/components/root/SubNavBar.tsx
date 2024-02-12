import "./layout.scss"

import { AppBar, Box, Button, Menu, MenuItem, Toolbar } from "@mui/material"
import { MouseEvent, useState } from "react"

import { LocalShipping } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"
import { CATEGORIES } from "../../utils"

const SubNavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static" color="inherit">
      <Toolbar variant="dense">
        <div>
          <Button
            size="large"
            color="inherit"
            startIcon={<MenuIcon />}
            onClick={handleMenu}
          >
            All categories
          </Button>
          <Menu
            className="all-categories-menu"
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
          >
            {CATEGORIES.map((category) => (
              <MenuItem key={category.id} onClick={handleClose}>
                <Link className="category-menu-item" to={category.id}>
                  {category.title}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <Button>New products</Button>
        <Button>New deals</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Box className="nav-link">
          <Button size="large" color="inherit" startIcon={<LocalShipping />}>
            Deliver to Helsinki, Finland
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default SubNavBar
