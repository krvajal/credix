import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import { ConfirmationView } from "./views/confirmation";
import { ShippingView } from "./views/shipping";
import { ProductsView } from "./views/products";
import { PaymentView } from "./views/payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: null,
    children: [
      {
        path: "/cart",
        element: <ProductsView />,
      },
      {
        path: "/shipping",
        element: <ShippingView />,
      },
      {
        path: "/payment",
        // TODO
        element: <PaymentView />,
      },
      {
        path: "/confirmation",
        // TODO
        element: <ConfirmationView />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
