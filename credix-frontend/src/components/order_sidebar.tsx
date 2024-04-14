import { computeCost, computeTotal } from "../lib/utils";
import { LineItem } from "./line_item";
import { PaymentButton } from "./payment_button";
import { useLocation } from "react-router-dom";
import { useOrder } from "@/hooks/order";

export function OrderSidebar() {
  const [order] = useOrder();
  useLocation();
  return (
    <aside className="bg-white p-4 w-72 h-full flex-none">
      <h2 className="uppercase font-semibold text-md">Resumo do pedido</h2>
      <div className="mt-5">
        <LineItem
          description={`Productos (${order.cart.products.length})`}
          amount={computeCost(order.cart.products)}
        />
        <LineItem description={`Desconto`} amount={-order.discountAmount} />
        <hr className="mt-2 pt-2" />
        <LineItem description={`Total do Frete`} amount={order.shippingCost} />
        <hr className="mt-2 pt-2" />
        <LineItem description={`Total`} amount={computeTotal(order)} />
      </div>
      <div className="mt-5">
        <PaymentButton />
      </div>
    </aside>
  );
}
