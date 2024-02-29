import {
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

import { ThemeProvider } from "@emotion/react"
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
  return (
    <Card className="product-basic-details-selectionCard">
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="flex-end">
          <Typography variant="h4" component="div">
            {initialPricingMethods.indexOf(pricingMethod) !== 3 && "From "}
            {selectedPrice}€
            {initialPricingMethods.indexOf(pricingMethod) !== 3 && "/month"}
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
              Select color
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
                  key={color}
                  value={color}
                  selected={color === selectedColor}
                >
                  <ThemeProvider theme={{ palette: { primary: color } }}>
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
              selected={method.key === pricingMethod?.key}
            >
              {method.value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </CardContent>
      <CardActions>
        <Button color="primary" fullWidth variant="contained">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductDetailsSelection
