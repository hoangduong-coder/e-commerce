import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"

import { Product } from "types/product"

const ProductCard = ({
  product,
  className,
}: {
  product: Product
  className: string
}) => {
  const priceDisplay = (price: number | number[]): number => {
    if (typeof price === "number") {
      return price > 1000 ? price / 36 : price / 24
    } else {
      const minPrice = (price as number[])[0]
      return minPrice > 1000 ? minPrice / 36 : minPrice / 24
    }
  }
  return (
    <Card className={className}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.picture}
        title={product.title}
      />
      <CardContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
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
            <Typography variant="h5" component="div" mt={2}>
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
    </Card>
  )
}

export default ProductCard
