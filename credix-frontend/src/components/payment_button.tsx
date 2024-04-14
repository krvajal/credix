import { ShoppingCartIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useOrder } from "../hooks/order";
import { getNextStep, isStepCompleted } from "../lib/utils";

export function PaymentButton() {
  const [order] = useOrder();
  const step = useLocation()?.pathname.slice(1);
  const isDisabled = !isStepCompleted(order, step);
  const nextStep = getNextStep(step);
  const isLastStep = !nextStep;

  return (
    <button
      form="orderForm"
      disabled={isDisabled}
      className="rounded bg-green-800 px-4 py-2 text-white
          font-medium w-full flex justify-center items-center"
    >
      <ShoppingCartIcon className="w-5 h-5" />
      <span className="mx-2">
        {!isLastStep ? "Continuar compra" : "Finalizar compra"}
      </span>
    </button>
  );
}
