/* eslint-disable react-hooks/exhaustive-deps */

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import { FormEvent, MouseEvent, useEffect, useState } from "react"
import { Color, PhoneProduct } from "types/helpers/productHelper"

import { useAppDispatch } from "reduxStore/hooks"
import { updateOrder } from "reduxStore/orderSlice"
import { OrderedProduct } from "types/order"
import { PricingMethod } from "types/product"
import { priceMethods } from "../../utils"

const ChangeOrderDialog = ({
  open,
  onCloseEvent,
  orderDetail,
}: {
  open: boolean
  onCloseEvent: () => void
  orderDetail: OrderedProduct
}) => {
  const dispatch = useAppDispatch()
  const [pricingMethodList, setPricingMethodList] = useState<
    Array<PricingMethod>
  >([])
  const [initialPrice, setInitialPrice] = useState<number>(0)

  const [selectedColor, setSelectedColor] = useState(orderDetail.selectedColor)
  const [selectedMemory, setSelectedMemory] = useState(
    orderDetail.selectedInnerMemory
  )
  const [selectedPrice, setSelectedPrice] = useState<number>(0)
  const [pricingMethod, setPricingMethod] = useState<number>(
    orderDetail.selectedPaymentDuration || 0
  )

  useEffect(() => {
    const firstPrice =
      typeof orderDetail.item.price === "number"
        ? orderDetail.item.price
        : orderDetail.item.price[0]

    const initialPricingMethods =
      firstPrice < 300 ? priceMethods.slice(1) : priceMethods
    setPricingMethodList(initialPricingMethods)

    setInitialPrice(firstPrice)
  }, [])

  useEffect(() => {
    if (selectedMemory) {
      const index = orderDetail.item.innerMemory.indexOf(selectedMemory)
      setInitialPrice((orderDetail.item.price as number[])[index])
    }
    if (pricingMethod !== 0) {
      setSelectedPrice(parseFloat((initialPrice / pricingMethod).toFixed(2)))
    } else {
      setSelectedPrice(initialPrice)
    }
  }, [selectedMemory, pricingMethod])

  const handleChangeMemory = (
    _event: MouseEvent<HTMLElement>,
    newMemorySize: number
  ) => {
    setSelectedMemory(newMemorySize)
  }

  const handleChangeColor = (
    _event: MouseEvent<HTMLElement>,
    newColor: Color
  ) => {
    setSelectedColor(newColor)
  }

  const handleChangePriceMethods = (
    _event: MouseEvent<HTMLElement>,
    newMethods: PricingMethod
  ) => {
    setPricingMethod(newMethods.key)
  }

  return (
    <Dialog
      open={open}
      onClose={onCloseEvent}
      PaperProps={{
        component: "form",
        onSubmit: (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          const formJson = Object.fromEntries(formData.entries())
          const quantity = formJson.quantity
          const color = selectedColor
          const innerMemory = selectedMemory
          dispatch(
            updateOrder({
              product: orderDetail.item,
              quantity: quantity,
              selectedInnerMemory: innerMemory,
              selectedColor: color,
              selectedPaymentDuration: pricingMethod,
              price: selectedPrice,
            })
          )
          onCloseEvent()
        },
      }}
    >
      <DialogTitle>Change order settings</DialogTitle>
      <DialogContent>
        <TextField
          id="quantity"
          name="quantity"
          label="Quantity"
          type="number"
          fullWidth
          variant="standard"
          value={orderDetail.quantity}
        />
        {typeof orderDetail.item.innerMemory !== "number" && (
          <>
            <Typography variant="body1" marginTop={1}>
              Select inner memory size
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={orderDetail.selectedInnerMemory}
              exclusive
              onChange={handleChangeMemory}
              className="product-basic-details-selectionMethod"
              fullWidth
            >
              {orderDetail.item.innerMemory.map((size) => (
                <ToggleButton
                  key={size}
                  value={size}
                  selected={size === selectedMemory}
                >
                  {size} GB
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </>
        )}
        {(orderDetail.item as PhoneProduct).color && (
          <>
            <Typography variant="body1" marginTop={1}>
              Selected color: <b>{selectedColor?.colorName}</b>
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={(orderDetail.item as PhoneProduct).color}
              exclusive
              onChange={handleChangeColor}
              className="product-basic-details-selectionMethod"
              fullWidth
            >
              {(orderDetail.item as PhoneProduct).color.map((color) => (
                <ToggleButton
                  key={color.colorCode}
                  value={color}
                  selected={color.colorCode === selectedColor?.colorCode}
                >
                  <ThemeProvider
                    theme={{ palette: { primary: color.colorCode } }}
                  >
                    <Box
                      sx={{
                        width: "90%",
                        height: 15,
                        bgcolor: "primary",
                        border: "1px solid",
                      }}
                    ></Box>
                  </ThemeProvider>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Typography variant="body1" marginTop={1}>
              Payment period
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={pricingMethodList}
              exclusive
              onChange={handleChangePriceMethods}
              className="product-basic-details-selectionMethod"
              fullWidth
            >
              {pricingMethodList.map((method) => (
                <ToggleButton
                  key={method.key}
                  value={method}
                  selected={method.key === pricingMethod}
                >
                  {method.value}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseEvent}>Cancel</Button>
        <Button type="submit">Modify</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangeOrderDialog
