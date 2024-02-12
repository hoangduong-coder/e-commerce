import { Container } from "@mui/material"
import { useRouteError } from "react-router-dom"
import NavBar from "./NavBar"
import SubNavBar from "./SubNavBar"

const NotFoundPage = () => {
  const error = useRouteError()
  return (
    <div>
      <NavBar />
      <SubNavBar />
      <Container maxWidth="xl" className="detail">
        <h1>Not found!</h1>
        <p>
          Sorry, an error has occurred. There is no result that you're looking
          for.
        </p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </Container>
    </div>
  )
}

export default NotFoundPage
