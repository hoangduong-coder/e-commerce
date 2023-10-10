import { Outlet, useLocation } from "react-router-dom"

import Home from "../store/Home"
import NavBar from "./NavBar"
import SubNavBar from "./SubNavBar"

const Root = () => {
  const pathName = useLocation()
  return (
    <>
      <NavBar />
      <SubNavBar />
      <div className="detail">{pathName !== "/" ? <Outlet /> : <Home />}</div>
    </>
  )
}

export default Root
