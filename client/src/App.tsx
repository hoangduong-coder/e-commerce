import { RouterProvider, createBrowserRouter } from "react-router-dom"

import NotFoundPage from "components/root/NotFoundPage"
import OrderPage from "pages/OrderPage"
import ProductDetail from "pages/ProductDetail"
import Products from "pages/Products"
import Root from "pages/Root"
import SignInForm from "pages/SignIn"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/:categoryParam",
          element: <Products />,
        },
        {
          path: "/:categoryParam/:productId",
          element: <ProductDetail />,
        },
        {
          path: "/orders",
          element: <OrderPage />,
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
