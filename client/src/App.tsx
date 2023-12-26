import { RouterProvider, createBrowserRouter } from "react-router-dom"

import CreateForm from "./components/admin/CreateForm"
import NotFoundPage from "./components/root/NotFoundPage"
import Root from "./components/root/Root"
import Products from "./components/store/Products"

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
          path: "/admin/create_products",
          element: <CreateForm />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
