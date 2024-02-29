import { Breadcrumbs, Grid, Skeleton, Typography } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "reduxStore/hooks"

import ProductBasicDetails from "components/store/ProductBasicDetails"
import ProductDescription from "components/store/ProductDescription"
import { useEffect } from "react"
import { initializeProductDetail } from "reduxStore/productSlice"
import { CATEGORIES } from "../utils"

const ProductDetail = () => {
  const { productId, categoryId } = useParams()
  const dispatch = useAppDispatch()
  const product = useAppSelector((state) => state.products.byId)
  const category = CATEGORIES.find((item) => item.id === categoryId)
  const loading = useAppSelector((state) => state.products.loading)

  useEffect(() => {
    dispatch(initializeProductDetail({ productId: productId as string }))
  }, [productId, dispatch])

  return (
    <>
      {loading === "pending" ? (
        <Grid container spacing={3}>
          <Grid item>
            <Skeleton variant="rectangular" width="100%" />
          </Grid>
          <Grid item>
            <Skeleton variant="rectangular" width="100%" />
          </Grid>
        </Grid>
      ) : (
        <div>
          {categoryId && (
            <>
              <Breadcrumbs>
                <Link className="text-link" to="/">
                  Store
                </Link>
                <Link className="text-link" to={`/${categoryId}`}>
                  {category?.title}
                </Link>
                <Typography color="text.primary">{product.title}</Typography>
              </Breadcrumbs>
              <ProductBasicDetails product={product} />
              <ProductDescription product={product} />
            </>
          )}
        </div>
      )}
    </>
  )
}
export default ProductDetail
