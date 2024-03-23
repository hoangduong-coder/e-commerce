import { Delete, Settings } from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  CardMedia,
  Link,
  Stack,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useAppDispatch } from "reduxStore/hooks"

import { deleteOrder } from "reduxStore/orderSlice"
import { OrderedProduct } from "types/order"
import ChangeOrderDialog from "./ChangeOrderDialog"

const OrderList = ({ orderList }: { orderList: OrderedProduct[] }) => {
  const dispatch = useAppDispatch()

  const [openSetting, setOpenSetting] = useState<boolean>(false)

  const handleOpenSettings = () => {
    setOpenSetting(true)
  }

  const handleCloseSettings = () => {
    setOpenSetting(false)
  }

  const handleDeleteOrder = (productId: string) => {
    dispatch(deleteOrder(productId))
  }

  return (
    <>
      {orderList.map((order) => (
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
              <Link
                href={`${order.product.category}/${order.product.id}`}
                underline="hover"
                variant="h5"
                color="inherit"
              >
                {order.product.title}
              </Link>
              <Typography gutterBottom variant="h6" component="div">
                <b>
                  {order.price}€
                  {order.selectedPaymentDuration !== 0 && "/month"}
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
                onClick={() => {
                  handleDeleteOrder(order.product.id)
                }}
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
      ))}
    </>
  )
}
export default OrderList
