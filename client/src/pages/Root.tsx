import { Outlet, useLocation } from "react-router-dom"

import { Container } from "@mui/material"
import NavBar from "components/root/NavBar"
import SubNavBar from "components/root/SubNavBar"
import Home from "pages/Home"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useAppDispatch } from "reduxStore/hooks"
import { initializeAll } from "reduxStore/orderSlice"

const Root = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [cookies] = useCookies(["orders"])

  useEffect(() => {
    if (cookies.orders?.length > 0) {
      dispatch(initializeAll(cookies.orders))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
