import { Order } from "./models";
import config from "@/config";

export async function createOrder(
  order: Order
): Promise<{ completeOrderUrl: string }> {
  const headers = {
    "content-type": "application/json",
  };
  const res = await fetch(`${config.API_URL}/orders`, {
    method: "post",
    body: JSON.stringify(order),
    headers,
  });

  if (!res.ok) {
    throw new Error("failed to create order");
  }
  return (await res.json()) as { completeOrderUrl: string };
}
