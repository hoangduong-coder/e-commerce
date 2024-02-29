import { Grid, Typography } from "@mui/material"
import { MouseEvent, useState } from "react"
import { ComputerProduct, PhoneProduct } from "types/helpers/productHelper"

import { priceMethods } from "../../utils"
import ProductDetailsSelection from "./ProductDetailsSelection"

const ProductBasicDetails = ({
  product,
}: {
  product: PhoneProduct | ComputerProduct
}) => {
  const initialPrice =
    typeof product.price === "number" ? product.price : product.price[0]
  const initialPricingMethods =
    initialPrice < 300 ? priceMethods.slice(1) : priceMethods

  const [selectedPrice, setSelectedPrice] = useState<number>(initialPrice)
  const [pricingMethod, setPricingMethod] = useState(initialPricingMethods[3])
  const [selectedMemory, setSelectedMemory] = useState<number>(
    typeof product.innerMemory !== "number"
      ? ([...product.innerMemory].pop() as number)
      : product.innerMemory
  )
  const [selectedColor, setSelectedColor] = useState<string>("")
  const handleChangePriceMethods = (
    _event: MouseEvent<HTMLElement>,
    newMethods: { key: number; value: string }
  ) => {
    setPricingMethod(newMethods)
    if (initialPricingMethods.indexOf(newMethods) !== 3) {
      setSelectedPrice(parseFloat((initialPrice / newMethods.key).toFixed(2)))
    } else {
      setSelectedPrice(initialPrice)
    }
  }

  const handleChangeMemory = (
    _event: MouseEvent<HTMLElement>,
    newMemorySize: number
  ) => {
    setSelectedMemory(newMemorySize)
  }

  const handleChangeColor = (
    _event: MouseEvent<HTMLElement>,
    newColor: string
  ) => {
    setSelectedColor(newColor)
  }

  return (
    <div>
      <Grid container spacing={3} mt={1}>
        <Grid item xs={4}>
          <img
            src={product.picture}
            alt={`${product.title}`}
            className="product-basic-details-image"
          />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            {product.brand.toUpperCase()}
          </Typography>
          <ProductDetailsSelection
            initialPricingMethods={initialPricingMethods}
            pricingMethod={pricingMethod}
            selectedPrice={selectedPrice}
            product={product}
            handleChangeMemory={handleChangeMemory}
            selectedMemory={selectedMemory}
            handleChangeColor={handleChangeColor}
            selectedColor={selectedColor}
            handleChangePriceMethods={handleChangePriceMethods}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductBasicDetails
