import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import NotFoundPage from './component/root/NotFoundPage';
import Root from './component/root/Root';
import Products from './component/store/Products';

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
