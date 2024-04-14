import { Label } from "../components/ui/label";
import Card from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ShippingLocation } from "@/lib/models";
import { useOrder } from "@/hooks/order";

export function ShippingView() {
  const [order, updateOrder] = useOrder();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingLocation>({
    defaultValues: order.shippingLocation,
  });

  const onSubmit: SubmitHandler<ShippingLocation> = (shippingLocation) => {
    updateOrder({ ...order, shippingLocation });
    navigate("/payment");
  };

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      id="orderForm"
    >
      <Card>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="taxId">Tax ID</Label>
            <Input value={order.buyer.taxId} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input value={order.buyer.companyName} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address1">Rua/Avenida</Label>
            <Input
              id="address1"
              {...register("address1", {
                required: "Required",
              })}
            />
            {errors.address1 && <span className="text-red-500">Required</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address2">Numero</Label>
            <Input
              id="address2"
              {...register("address2", {
                required: "Required",
              })}
            />
            {errors.address2 && <span className="text-red-500">Required</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Cuidad</Label>
            <Input
              id="city"
              {...register("city", {
                required: "Required",
              })}
            />
            {errors.city && <span className="text-red-500">Required</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Codigo Postal</Label>
            <Input
              id="postalCode"
              {...register("postalCode", {
                required: "Required",
              })}
            />
            {errors.postalCode && (
              <span className="text-red-500">Required</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Estado</Label>
            <Input
              id="region"
              {...register("region", {
                required: "Required",
              })}
            />
            {errors.region && <span className="text-red-500">Required</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email para nota fiscal</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Required",
              })}
            />
            {errors.email && <span className="text-red-500">Required</span>}
          </div>
        </div>
      </Card>
    </form>
  );
}
