import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

// Create a browser router with the specified routes
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> }, // Define the home page
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader, // Load the menu data
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> }, // Show the cart page
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction, // Create a new order
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader, // Load the order data
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
