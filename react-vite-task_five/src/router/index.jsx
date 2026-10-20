import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ProductsListAdmin from "../pages/ProductsListAdmin";
import ProductsList from "../pages/ProductsList";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "productsListAdmin",
        element: <ProductsListAdmin />,
      },
    ],
  },
]);

export default router;
