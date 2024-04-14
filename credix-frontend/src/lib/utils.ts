import { Order, ProductInfo } from "./models";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatCurrency(amount: number) {
  return formatter.format(amount);
}

export function computeCost(products: ProductInfo[]) {
  return products.reduce((acc, p) => {
    return acc + p.quantity * p.unitCost;
  }, 0);
}

export function computeTotal(order: Order) {
  const productsCost = computeCost(order.cart.products);
  let total = productsCost;
  total -= order.discountAmount;
  total += order.shippingCost;
  return total;
}

export function isStepCompleted(order: Order, step: string) {
  return true;
}

// TODO: make step an enum
export function getNextStep(step: string): string | undefined {
  if (step === "cart") {
    return "shipping";
  }
  if (step === "shipping") {
    return "payment";
  }
  if (step === "payment") {
    return "confirmation";
  }
  return;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
