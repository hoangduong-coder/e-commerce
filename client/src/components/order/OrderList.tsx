import { List, ListItem } from "@mui/material"

import { useAppSelector } from "reduxStore/hooks"

const OrderList = () => {
  const orders = useAppSelector((state) => state.orders.all)
  console.log(orders)
  return (
    <List>
      {orders.map((order) => (
        <ListItem alignItems="flex-start" key={order.productID}>
          Item
        </ListItem>
      ))}
    </List>
  )
}
export default OrderList
