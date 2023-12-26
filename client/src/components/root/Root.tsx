import { Outlet, useLocation } from "react-router-dom"

import { Container } from "@mui/material"
import Home from "../store/Home"
import NavBar from "./NavBar"
import SubNavBar from "./SubNavBar"

const Root = () => {
  const location = useLocation()
  return (
    <>
      <NavBar />
      <SubNavBar />
      <Container maxWidth="xl" className="detail">{location.pathname !== "/" ? <Outlet /> : <Home />}</Container>
    </>
  )
}

export default Root
