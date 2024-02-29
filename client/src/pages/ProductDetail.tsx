import { Breadcrumbs, Typography } from "@mui/material"
import { Link, useParams } from "react-router-dom"

import { useEffect } from "react"
import { useAppSelector } from "reduxStore/hooks"
import { initializeProductDetail } from "reduxStore/productSlice"
import { CATEGORIES } from "../utils"

const ProductDetail = () => {
  const { productId } = useParams()
  const { categoryId } = useParams()
  const product = useAppSelector((state) => state.products.byId)
  const category = CATEGORIES.find((item) => item.id === categoryId)

  useEffect(() => {
    initializeProductDetail({ productId: productId as string })
  }, [productId])

  return (
    <>
      {categoryId && product && (
        <div>
          <Breadcrumbs>
            <Link className="text-link" to="/">
              Store
            </Link>
            <Link className="text-link" to={categoryId}>
              {category?.title}
            </Link>
            <Typography color="text.primary">{product.title}</Typography>
          </Breadcrumbs>
        </div>
      )}
    </>
  )
}
export default ProductDetail
