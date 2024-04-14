import { Header } from "./components/header";
import { OrderSidebar } from "./components/order_sidebar";
import { Outlet } from "react-router-dom";
import { OrderProvider, useOrder } from "./hooks/order";

function Layout() {
  const order = useOrder();
  return (
    <>
      <OrderProvider>
        <div className="flex flex-col bg-zinc-100 h-screen text-gray-700">
          <Header />
          <div className="max-w-screen-xl mx-auto w-full flex flex-1">
            <main className="flex-1 py-4 px-10 min-w-0 flex-1">
              <Outlet />
            </main>
            <OrderSidebar />
          </div>
        </div>
      </OrderProvider>
    </>
  );
}

export default Layout;
