import {
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"

import { useAppSelector } from "reduxStore/hooks"

const Receipt = () => {
  const order = useAppSelector((state) => state.orders.all)
  const [payAtOnceTotal, setPayAtOnceTotal] = useState<number>(0)
  const [payMonthlyTotal, setMonthlyTotal] = useState<number>(0)

  useEffect(() => {
    order.forEach((cartItem) => {
      if (cartItem.selectedPaymentDuration === 0) {
        setPayAtOnceTotal((prev) => prev + cartItem.price)
      } else {
        setMonthlyTotal((prev) => prev + cartItem.price)
      }
    })
  }, [order])

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Your receipt</Typography>
        <Divider sx={{ py: 1 }} />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Pay at once
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{payAtOnceTotal}€</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Pay by month
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{payMonthlyTotal}€/month</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Receipt
