import { RouterProvider, createBrowserRouter } from "react-router-dom"

import NotFoundPage from "components/root/NotFoundPage"
import Root from "components/root/Root"
import Products from "pages/Products"
import SignInForm from "pages/SignIn"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/:categoryId",
          element: <Products />,
        },
        {
          path: "/signin",
          element: <SignInForm />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
