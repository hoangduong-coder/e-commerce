import { Outlet, useLocation } from "react-router-dom"

import { Container } from "@mui/material"
import NavBar from "components/root/NavBar"
import SubNavBar from "components/root/SubNavBar"
import Home from "pages/Home"
import { useEffect } from "react"
import { useAppDispatch } from "reduxStore/hooks"
import { initializeAll } from "reduxStore/orderSlice"
import { orderFromLocalStorage } from "../utils"

const Root = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (orderFromLocalStorage.length > 0) {
      dispatch(initializeAll(orderFromLocalStorage))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage])

  return (
    <>
      <NavBar />
      <SubNavBar />
      <Container maxWidth="xl" className="detail">
        {location.pathname !== "/" ? <Outlet /> : <Home />}
      </Container>
    </>
  )
}

export default Root
