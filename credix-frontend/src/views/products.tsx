import Card from "@/components/ui/card";
import { useOrder } from "../hooks/order";
import { formatCurrency } from "../lib/utils";
import { Cart } from "@/lib/models";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";

export function ProductsView() {
  const [order, updateOrder] = useOrder();
  const navigate = useNavigate();
  const { register, watch, control, handleSubmit } = useForm<Cart>({
    defaultValues: order.cart,
  });

  const onSubmit: SubmitHandler<Cart> = (cart) => {
    updateOrder({ ...order, cart });
    navigate("/shipping");
  };

  const { fields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "products",
  });

  return (
    <form id="orderForm" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        {fields.map((p, idx) => {
          const fieldName = `products.${idx}.quantity` as const;
          const quantity = formatCurrency(watch(fieldName) * p.unitCost);
          return (
            <div key={p.sku} className="flex items-center w-full">
              <img
                src="https://img.lojadomecanico.com.br/256/43/394/81894/Jogo-com-13-Pecas---Chave-Parafusadeira--fortgpro-fg3300131.JPG"
                className="w-24 h-24"
              />
              <div className="min-w-0 flex-1">
                <div className="text-lg truncate">{p.name}</div>
                <div>{p.sku}</div>
              </div>
              <div className="pl-10 flex gap-2 items-center">
                <Input
                  type="number"
                  min={1}
                  step={1}
                  {...register(fieldName)}
                  className="outline-none w-20 border border-solid border-zinc-400 px-2 py-0 rounded h-10 text-lg"
                />
                <div className="font-medium text-xl">{quantity}</div>
              </div>
            </div>
          );
        })}
      </Card>
    </form>
  );
}
