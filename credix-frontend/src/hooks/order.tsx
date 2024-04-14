import { Order } from "@/lib/models";
import React, { useState } from "react";

const initialOrder: Order = {
  buyer: {
    companyName: "Terraforte Constructions",
    taxId: "26900161000125",
  },
  shippingLocation: {
    address1: "Rua das Flores",
    address2: "123",
    city: "São Paulo",
    region: "SP",
    postalCode: "01302000",
    email: "contact@miguelcarvajal.me",
    country: "BR",
  },
  payment: {
    term: "30",
  },
  cart: {
    products: [
      {
        sku: "2901359",
        name: "Compressor de Ar 20 Litros 6,4Pés 2HP 127V CP8022 com Jogo de Acessórios - TEKNA-1011",
        quantity: 1,
        unitCost: 935.8,
      },
    ],
  },
  discountAmount: 0,
  shippingCost: 0,
};

const OrderContext = React.createContext([
  initialOrder,
  (_: Order): void => {
    throw new Error("wrap your component in an OrderProvider");
  },
] as const);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const ctx = useState(initialOrder);
  return <OrderContext.Provider value={ctx}>{children}</OrderContext.Provider>;
}

export const useOrder = () => {
  return React.useContext(OrderContext);
};
