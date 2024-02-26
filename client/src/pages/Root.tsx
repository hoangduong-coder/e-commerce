import { Outlet, useLocation } from "react-router-dom"

import { Container } from "@mui/material"
import NavBar from "components/root/NavBar"
import SubNavBar from "components/root/SubNavBar"
import Home from "components/store/Home"

const Root = () => {
  const location = useLocation()
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
