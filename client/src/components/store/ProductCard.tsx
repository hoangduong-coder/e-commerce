import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material"

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
        <div>
          <Typography variant="body2" color="text.secondary">
            Available colors:{" "}
          </Typography>
          <Stack direction="row">
            {product.color.map((code) => (
              <div
                style={{ backgroundColor: code, borderRadius: "50%" }}
                key={code}
              />
            ))}
          </Stack>
        </div>
        <Typography variant="h5" component="div" align="right">
          €{product.price}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCard
