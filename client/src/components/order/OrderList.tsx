import { Delete, Settings } from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"

import { useAppSelector } from "reduxStore/hooks"
import { OrderedProduct } from "types/order"
import ChangeOrderDialog from "./ChangeOrderDialog"

const OrderList = () => {
  const orders = useAppSelector((state) => state.orders.all)
  const [orderList, setOrderList] = useState<OrderedProduct[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openSetting, setOpenSetting] = useState<boolean>(false)

  useEffect(() => {
    setOrderList(orders)
    setLoading(false)
  }, [orders])

  if (loading) {
    return <Skeleton variant="rectangular" height={60} />
  }

  const priceFormat = (price: number, methodKey: number) => {
    if (methodKey === 0) {
      return `${price}€`
    } else {
      return `${(price / methodKey).toFixed(2)}€/month`
    }
  }

  const handleOpenSettings = () => {
    setOpenSetting(true)
  }

  const handleCloseSettings = () => {
    setOpenSetting(false)
  }

  return (
    <>
      {!loading && orderList.length === 0 ? (
        <Typography gutterBottom variant="body1" component="div" marginTop={2}>
          There are no orders in this cart.
        </Typography>
      ) : (
        orderList.map((order) => (
          <Card
            variant="outlined"
            key={order.product.id}
            sx={{ display: "flex", flexDirection: "row", marginTop: 2 }}
          >
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={order.product.picture}
              alt={order.product.title}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                width: "100%",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography gutterBottom variant="h5" component="div">
                  {order.product.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  <b>
                    {priceFormat(order.price, order.selectedPaymentDuration)}
                  </b>
                </Typography>
              </Stack>
              <Typography gutterBottom variant="body1" component="div">
                {order.product.brand}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  marginRight={1}
                >
                  Color: <b>{order.selectedColor?.colorName}</b>
                </Typography>
                -
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  marginLeft={1}
                >
                  Quantity: <b>{order.quantity}</b>
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                marginTop={1}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Settings />}
                  onClick={handleOpenSettings}
                >
                  Modify order
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  startIcon={<Delete />}
                >
                  Delete order
                </Button>
                <ChangeOrderDialog
                  open={openSetting}
                  onCloseEvent={handleCloseSettings}
                  orderDetail={order}
                />
              </Stack>
            </Box>
          </Card>
        ))
      )}
    </>
  )
}
export default OrderList
