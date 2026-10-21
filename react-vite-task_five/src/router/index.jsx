import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ProductsListAdmin from "../pages/ProductsListAdmin";
import ProductsList from "../pages/ProductsList";
import Home from "../pages/Home";
import ProductDetail from "../pages/productDetail";
import CartList from "../pages/CartList";

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
        path: "productsList",
        element: <ProductsList />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "productsListAdmin",
        element: <ProductsListAdmin />,
      },
      {
        path: "productDetail/:id",
        element: <ProductDetail />,
      },
      {
        path: "cartList",
        element: <CartList />,
      },
    ],
  },
]);

export default router;
