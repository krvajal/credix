import {
  AlertTriangleIcon,
  WalletIcon,
  CalendarIcon,
  EditIcon,
  MapPinnedIcon,
} from "lucide-react";
import { computeTotal, formatCurrency } from "../lib/utils";
import { useOrder } from "../hooks/order";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "@/lib/api";

export function ConfirmationView() {
  const [order] = useOrder();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <form
        id="orderForm"
        onSubmit={(evt) => {
          evt.preventDefault();
          setIsSubmitting(true);
          createOrder(order)
            .then(({ completeOrderUrl }) => {
              debugger;
              window.location.href = completeOrderUrl;
            })
            .catch((_) => {
              debugger;
              // TODO: show error message to the user
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        }}
      >
        <div>
          <span className="font-medium">John Doe</span>, revise sua compra e
          finalize seu pedido
        </div>
        <div className="mt-6">
          <div className="flex items-center font-bold gap-2 text-sm">
            <MapPinnedIcon className="w-5 h-5" /> Endereco da empresa
          </div>
          <div className="bg-white rounded-md shadow-md p-3 mt-2 flex">
            <div>
              <div className="font-semibold uppercase">
                {order.buyer.companyName}
              </div>
              <div>CNPJ: {order.buyer.taxId}</div>
              <div>
                <span>
                  {order.shippingLocation.address1}{" "}
                  {order.shippingLocation.address2}
                </span>
              </div>
              <div>
                <span>{order.shippingLocation.region}</span>
                {" - "}
                <span>{order.shippingLocation.postalCode}</span>
              </div>
            </div>
            <div className="ml-auto">
              <Link
                to="/shipping"
                className="bg-blue-200 bg-opacity-40 text-blue-500 px-2 p-1 rounded-md flex items-center text-sm cursor-pointer"
              >
                <EditIcon className="w-4 h-4" />
                <span className="ml-2">Alterar direccion</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center font-bold gap-2 text-sm">
            <WalletIcon className="w-5 h-5" /> Detalles del pago
          </div>
          <div className="bg-white rounded-md shadow-md p-3 px-4 mt-2 flex">
            <div className="inline-flex flex-col items-center">
              <CalendarIcon className="w-8 h-8 text-orange-600" />
              <div className="text-xs">
                <span className="font-medium">CREDI</span>
                <span>PAY</span>
              </div>
            </div>
            <div className="ml-4">
              <div>
                <span className="font-semibold">
                  Pix em {order.payment.term} dais
                </span>
                <span className="text-gray-500 text-md">
                  {" "}
                  - Compore agora, pague depois
                </span>
              </div>
              <div className="font-medium">
                Vocé pagara {formatCurrency(computeTotal(order))}
              </div>
              <ul className="list-disc pl-4 text-sm text-gray-500">
                <li>Sem juros</li>
                <li>Mesmo preco. Mais tempo para pagar</li>
                <li>
                  Pague com facilidade usando plx apox {order.payment.term} days
                </li>
              </ul>
            </div>
            <div className="ml-auto">
              <Link
                to="/payment"
                className="bg-blue-200 bg-opacity-40 text-blue-500 px-2 p-1 rounded-md flex items-center text-sm cursor-pointer"
              >
                <EditIcon className="w-4 h-4" />
                <span className="ml-2">Alterar forma de pagamento</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md p-3 px-4 mt-6">
          <div className="flex gap-1 items-center">
            <AlertTriangleIcon className="w-4 h-4" />
            <span>ATENCÃO</span>
          </div>
          <div className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            alias nostrum deserunt reprehenderit reiciendis, voluptate magni
            cumque ea. Consectetur officia quas itaque asperiores, nam
            praesentium? Aliquid inventore rerum quo expedita!
          </div>
        </div>
      </form>
    </>
  );
}
