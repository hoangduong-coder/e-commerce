import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material"

import { Link } from "react-router-dom"
import { Product } from "types/product"

const ProductCard = ({ product }: { product: Product }) => {
  const priceDisplay = (price: number | number[]): number => {
    if (typeof price === "number") {
      return price > 300 ? price / 36 : price / 24
    } else {
      const minPrice = price[0]
      return minPrice > 300 ? minPrice / 36 : minPrice / 24
    }
  }
  return (
    <Card className="product-card">
      <CardActionArea>
        <Link className="product-card-link" to={product.id}>
          <CardMedia
            sx={{ height: 160 }}
            image={product.picture}
            title={product.title}
          />
          <CardContent className="product-card-content">
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="stretch"
              className="product-card-content-grid"
            >
              <Grid item>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.brand}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" component="div">
                  from €
                  {typeof product.price === "number"
                    ? product.price
                    : product.price[0]}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  or from €{priceDisplay(product.price).toFixed(2)}
                  /month
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
