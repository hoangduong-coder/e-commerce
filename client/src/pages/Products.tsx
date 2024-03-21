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
  const { categoryParam } = useParams()
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

  const options = [
    {
      id: 1,
      value: "newest",
      label: "Newest",
    },
    {
      id: 2,
      value: "price-ascending",
      label: "By price (low to high)",
    },
    {
      id: 3,
      value: "price-descending",
      label: "By price (high to low)",
    },
  ]

  useEffect(() => {
    const findCategory = CATEGORIES.find(
      (item) => item.id === categoryParam || item.type === categoryParam
    )
    if (findCategory) {
      setCategory(findCategory)
      dispatch(initializeProducts({ category: findCategory.type }))
    }
  }, [categoryParam])

  useEffect(() => {
    setProductList(initialProductList)

    const priceList = Array.from(
      new Set(
        initialProductList.map((product) => {
          return typeof product.price === "number"
            ? product.price
            : product.price[0]
        })
      )
    )
    setPrice([Math.min(...priceList), Math.max(...priceList)])
  }, [initialProductList])

  useEffect(() => {
    const sortedList = [...initialProductList]

    switch (sortOption) {
      case "newest": {
        sortedList.sort(
          (prev, curr) =>
            new Date(prev.updatedAt).getTime() -
            new Date(curr.updatedAt).getTime()
        )
        break
      }
      case "price-ascending": {
        sortedList.sort((prev, curr) =>
          typeof curr.price === "number" && typeof prev.price === "number"
            ? prev.price - curr.price
            : (prev.price as number[])[0] - (curr.price as number[])[0]
        )
        break
      }
      case "price-descending": {
        sortedList.sort((prev, curr) =>
          typeof curr.price === "number" && typeof prev.price === "number"
            ? curr.price - prev.price
            : (curr.price as number[])[0] - (prev.price as number[])[0]
        )
        break
      }
      default:
        break
    }
    setProductList(sortedList)
  }, [sortOption])

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
    event.preventDefault()
    const { value } = event.target
    setSortOption(value)
  }

  const handleChangePrice = (event: any) => {
    event.preventDefault()
    const { value } = event.target
    setSelectedPrice(value)
    setProductList(
      initialProductList.filter((product) => {
        if (typeof product.price === "number") {
          return product.price >= value[0] && product.price <= value[1]
        } else {
          return product.price[0] >= value[0] && product.price[0] <= value[1]
        }
      })
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
            onChange={(_event: any, newValue: string[]) => {
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
              {options.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {productList.length > 0 ? (
        <Grid container spacing={2} marginTop={1} className="product-container">
          {productList.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
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
