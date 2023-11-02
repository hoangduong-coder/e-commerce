import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import CreateForm from './component/admin/CreateForm';
import NotFoundPage from './component/root/NotFoundPage';
import Products from './component/store/Products';
import Root from './component/root/Root';

function App () {
  const router = createBrowserRouter ([
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/:categoryId',
          element: <Products />,
        },
        {
          path: '/admin/create_products',
          element: <CreateForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
