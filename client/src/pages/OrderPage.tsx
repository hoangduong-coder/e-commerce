import { Button, Grid, Skeleton, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import OrderList from "components/order/OrderList"
import Receipt from "components/order/Receipt"
import { Link } from "react-router-dom"
import { useAppSelector } from "reduxStore/hooks"
import { OrderedProduct } from "types/order"

const OrderPage = () => {
  const orders = useAppSelector((state) => state.orders.all)

  const [orderList, setOrderList] = useState<OrderedProduct[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setOrderList(orders)
    setLoading(false)
  }, [orders])

  if (loading) {
    return <Skeleton variant="rectangular" height={60} />
  }

  return (
    <div>
      {!loading && orderList.length === 0 ? (
        <>
          <Typography variant="h4">Your shopping cart</Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            marginTop={2}
          >
            There are no orders in this cart.
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            <Link to="/" className="link">
              Back to shopping
            </Link>
          </Button>
        </>
      ) : (
        <Grid container spacing={5}>
          <Grid item xs={8}>
            <Typography variant="h4">Your shopping cart</Typography>
            <OrderList orderList={orderList} />
          </Grid>
          <Grid item xs={4}>
            <Receipt />
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default OrderPage
