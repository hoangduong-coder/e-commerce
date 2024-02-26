import { Card, CardContent, CardMedia, Typography } from "@mui/material"

import { Product } from "types/product"

const ProductCard = ({
  product,
  className,
}: {
  product: Product
  className: string
}) => {
  return (
    <Card className={className}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.picture}
        title={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {product.brand}
        </Typography>
        <Typography variant="h5" component="div" mt={2}>
          €{product.price}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          or from €
          {(product.price > 1000
            ? product.price / 36
            : product.price / 24
          ).toFixed(2)}
          /month
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCard
