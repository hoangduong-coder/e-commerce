import { Button, Popover } from "@mui/material"

import { useState } from "react"

const ProductsFilter = ({
  title,
  children,
}: {
  title: string
  children: JSX.Element
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        className="filter-button"
      >
        {title}
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {children}
      </Popover>
    </>
  )
}

export default ProductsFilter
