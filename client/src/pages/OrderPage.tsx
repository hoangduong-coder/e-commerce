import { Card, CardContent, Grid, Typography } from "@mui/material"

import OrderList from "components/order/OrderList"

const OrderPage = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h4">Your shopping cart</Typography>
          <OrderList />
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Your receipt</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default OrderPage