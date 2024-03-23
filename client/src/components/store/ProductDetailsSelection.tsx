/* eslint-disable react-hooks/exhaustive-deps */

import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "reduxStore/hooks"

import { ThemeProvider } from "@emotion/react"
import { Link } from "react-router-dom"
import { addToCart } from "reduxStore/orderSlice"
import { PhoneProduct } from "types/helpers/productHelper"
import { ProductDetailSelectionProps } from "types/product"

const ProductDetailsSelection = ({
  initialPricingMethods,
  pricingMethod,
  selectedPrice,
  product,
  handleChangeMemory,
  selectedMemory,
  handleChangeColor,
  selectedColor,
  handleChangePriceMethods,
}: ProductDetailSelectionProps) => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.orders.all)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (orders.find((order) => order.product.id === product.id)) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [orders])

  const addNewOrder = () => {
    const newOrder = {
      product: product,
      quantity: 1,
      selectedInnerMemory: selectedMemory,
      selectedColor: selectedColor,
      selectedPaymentDuration: pricingMethod,
      price: selectedPrice,
    }
    dispatch(addToCart(newOrder))
  }

  return (
    <Card className="product-basic-details-selectionCard">
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="flex-end">
          <Typography variant="h4" component="div">
            {pricingMethod !== 0 && "From "}
            {selectedPrice}€{pricingMethod !== 0 && "/month"}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            VAT 24%
          </Typography>
        </Stack>
        {typeof product.innerMemory !== "number" && (
          <>
            <Typography variant="body1" marginTop={1}>
              Select inner memory size
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={product.innerMemory}
              exclusive
              onChange={handleChangeMemory}
              className="product-basic-details-selectionMethod"
              fullWidth
            >
              {product.innerMemory.map((size) => (
                <ToggleButton
                  key={size}
                  value={size}
                  selected={size === selectedMemory}
                >
                  {size} GB
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </>
        )}
        {(product as PhoneProduct).color && (
          <>
            <Typography variant="body1" marginTop={1}>
              Selected color: <b>{selectedColor.colorName}</b>
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={(product as PhoneProduct).color}
              exclusive
              onChange={handleChangeColor}
              className="product-basic-details-selectionMethod"
              fullWidth
            >
              {(product as PhoneProduct).color.map((color) => (
                <ToggleButton
                  key={color.colorCode}
                  value={color}
                  selected={color.colorCode === selectedColor.colorCode}
                >
                  <ThemeProvider
                    theme={{ palette: { primary: color.colorCode } }}
                  >
                    <Box
                      sx={{
                        width: "90%",
                        height: 15,
                        bgcolor: "primary",
                        border: "1px solid",
                      }}
                    ></Box>
                  </ThemeProvider>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </>
        )}
        <Typography variant="body1" marginTop={1}>
          Select payment period
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={initialPricingMethods}
          exclusive
          onChange={handleChangePriceMethods}
          className="product-basic-details-selectionMethod"
          fullWidth
        >
          {initialPricingMethods.map((method) => (
            <ToggleButton
              key={method.key}
              value={method}
              selected={method.key === pricingMethod}
            >
              {method.value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </CardContent>
      <CardActions disableSpacing>
        {disabled && (
          <Alert severity="warning" className="product-basic-details-alert">
            You have already ordered this product. Please visit{" "}
            <Link to="/orders">Your shopping cart</Link> page to modify changes!
          </Alert>
        )}
        <Button
          color="primary"
          fullWidth
          variant="contained"
          disabled={disabled}
          onClick={addNewOrder}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductDetailsSelection
