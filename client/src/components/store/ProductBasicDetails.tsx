/* eslint-disable react-hooks/exhaustive-deps */

import { Grid, Typography } from "@mui/material"
import { MouseEvent, useEffect, useState } from "react"
import { ComputerProduct, PhoneProduct } from "types/helpers/productHelper"

import { PricingMethod } from "types/product"
import { priceMethods } from "../../utils"
import ProductDetailsSelection from "./ProductDetailsSelection"

const ProductBasicDetails = ({
  product,
}: {
  product: PhoneProduct | ComputerProduct
}) => {
  //initialData
  const [pricingMethodList, setPricingMethodList] = useState<
    Array<PricingMethod>
  >([])
  const [initialPrice, setInitialPrice] = useState<number>(0)

  //user selection data
  const [selectedPrice, setSelectedPrice] = useState<number>(0)
  const [pricingMethod, setPricingMethod] = useState<PricingMethod>({
    key: 0,
    value: "",
  })
  const [selectedMemory, setSelectedMemory] = useState<number>(0)
  const [selectedColor, setSelectedColor] = useState<string>(
    (product as PhoneProduct).color[0] ?? ""
  )

  useEffect(() => {
    const firstPrice =
      typeof product.price === "number" ? product.price : product.price[0]
    setInitialPrice(firstPrice)
    setSelectedPrice(firstPrice)

    const initialPricingMethods =
      firstPrice < 300 ? priceMethods.slice(1) : priceMethods
    setPricingMethodList(initialPricingMethods)
    setPricingMethod(initialPricingMethods[initialPricingMethods.length - 1])

    setSelectedMemory(
      typeof product.innerMemory !== "number"
        ? product.innerMemory[0]
        : product.innerMemory
    )
  }, [])

  useEffect(() => {
    if (pricingMethod.key !== 0) {
      setSelectedPrice(
        parseFloat((initialPrice / pricingMethod.key).toFixed(2))
      )
    } else {
      setSelectedPrice(initialPrice)
    }
  }, [initialPrice])

  const handleChangePriceMethods = (
    _event: MouseEvent<HTMLElement>,
    newMethods: PricingMethod
  ) => {
    setPricingMethod(newMethods)
    if (
      pricingMethodList.indexOf(newMethods) !==
      pricingMethodList.length - 1
    ) {
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
    const index = product.innerMemory.indexOf(newMemorySize)
    setInitialPrice((product.price as number[])[index])
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
        <Grid item xs={6}>
          <img
            src={product.picture}
            alt={`${product.title}`}
            className="product-basic-details-image"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            {product.brand.toUpperCase()}
          </Typography>
          <ProductDetailsSelection
            initialPricingMethods={pricingMethodList}
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
