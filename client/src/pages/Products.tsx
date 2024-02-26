/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import "./pages.scss"

import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "reduxStore/hooks"
import { Category, Product } from "types/product"

import ProductCard from "components/store/ProductCard"
import ProductsFilter from "components/store/ProductsFilter"
import { useParams } from "react-router-dom"
import { initializeProducts } from "reduxStore/productSlice"
import { CATEGORIES } from "../utils"

const Products = () => {
  const { categoryId } = useParams()
  const dispatch = useAppDispatch()
  const initialProductList = useAppSelector((state) => state.products.all)

  const [productList, setProductList] = useState<Array<Product>>([])
  const [brandList, setBrandList] = useState<string[]>([])
  const [category, setCategory] = useState<Category>({
    id: "",
    title: "",
    pictureUrl: "",
    type: "",
  })
  const [price, setPrice] = useState([10, 100])

  const [sortOption, setSortOption] = useState("")
  const [selectedPrice, setSelectedPrice] = useState([10, 100])
  const [selectedBrand, setSelectedBrand] = useState<string[]>([])

  useEffect(() => {
    const findCategory = CATEGORIES.find((item) => item.id === categoryId)
    if (findCategory) {
      setCategory(findCategory)
      dispatch(initializeProducts({ category: findCategory.type }))
    }
  }, [categoryId])

  useEffect(() => {
    if (initialProductList.length > 0) {
      setProductList(initialProductList)

      const priceList = Array.from(
        new Set(
          initialProductList.map((product) => {
            return product.price
          })
        )
      )
      setPrice([Math.min(...priceList), Math.max(...priceList)])
    }
  }, [initialProductList])

  useEffect(() => {
    if (productList?.length > 0) {
      const brands = Array.from(
        new Set(
          productList.map((product) => {
            return product.brand
          })
        )
      )
      setBrandList(brands)
    }
  }, [productList])

  useEffect(() => {
    if (productList?.length > 0 && selectedBrand.length > 0) {
      setProductList(
        productList.filter((product) => selectedBrand.includes(product.brand))
      )
    }
  }, [selectedBrand])

  const handleChangeOption = (event: SelectChangeEvent) => {
    setSortOption(event.target.value)
  }

  const handleChangePrice = (event: any) => {
    event.preventDefault()
    const { value } = event.target
    setSelectedPrice(value)
    setProductList(
      initialProductList.filter(
        (product) => product.price >= value[0] && product.price <= value[1]
      )
    )
  }

  const priceText = (value: number) => {
    return `€${value}`
  }

  return (
    <div>
      <h1>{category.title}</h1>
      <Grid container spacing={2} marginTop={1} className="filter-container">
        <Grid item xs={5}>
          <Autocomplete
            multiple
            onChange={(event: any, newValue: string[]) => {
              setSelectedBrand(newValue)
            }}
            limitTags={3}
            options={brandList}
            getOptionLabel={(option: string) => option}
            renderInput={(params) => (
              <TextField {...params} label="Brands" placeholder="Favorite" />
            )}
          />
        </Grid>
        <Grid item xs={5}>
          <ProductsFilter
            title={`Price: From €${selectedPrice[0]} to €${selectedPrice[1]}`}
          >
            <Box className="price-slider">
              <Slider
                getAriaLabel={() => "Price range"}
                value={selectedPrice}
                max={price[1]}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                getAriaValueText={priceText}
                className="price-filter-dropdown"
                marks={[
                  {
                    value: 0,
                    label: "€0",
                  },
                  {
                    value: price[1],
                    label: priceText(price[1]),
                  },
                ]}
              />
            </Box>
          </ProductsFilter>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth className="filter-dropdown-container">
            <InputLabel>Sort</InputLabel>
            <Select
              value={sortOption}
              label="Sort"
              onChange={handleChangeOption}
              className="filter-dropdown"
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="discount">By discount</MenuItem>
              <MenuItem value="price-ascending">
                By price (low to high)
              </MenuItem>
              <MenuItem value="price-descending">
                By price (high to low)
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {productList.length > 0 ? (
        <Grid container spacing={2} marginTop={1} className="product-container">
          {productList.map((product) => (
            <Grid item xs={3}>
              <ProductCard
                key={product.id}
                product={product}
                className="product-card"
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography mt={1} variant="body1">
          No product found!
        </Typography>
      )}
    </div>
  )
}
export default Products
