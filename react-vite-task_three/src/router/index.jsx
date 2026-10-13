import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ProductsList from "../pages/ProductsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductsList />,
      },
    ],
  },
]);

export default router;
