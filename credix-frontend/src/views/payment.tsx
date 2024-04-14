import Card from "../components/ui/card";
import {
  useForm,
  SubmitHandler,
  Control,
  useController,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon } from "lucide-react";
import { useOrder } from "@/hooks/order";
import { computeTotal, formatCurrency } from "@/lib/utils";
import { Order, PaymentInformation } from "@/lib/models";

export function PaymentView() {
  const [order, updateOrder] = useOrder();

  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<PaymentInformation>({
    defaultValues: order.payment,
  });

  const onSubmit: SubmitHandler<PaymentInformation> = (payment) => {
    updateOrder({ ...order, payment });
    navigate("/confirmation");
  };

  const controller = useController({
    name: "term",
    control,
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      id="orderForm"
    >
      <Card>
        <RadioGroup
          defaultValue={controller.field.value}
          onValueChange={(v) => controller.field.onChange(v)}
        >
          <PaymentOption
            order={order}
            isChecked={controller.field.value == "30"}
            term="30"
          />
          <PaymentOption
            order={order}
            isChecked={controller.field.value == "14"}
            term="14"
          />
          <PaymentOption
            order={order}
            isChecked={controller.field.value == "7"}
            term="7"
          />
        </RadioGroup>
      </Card>
    </form>
  );
}

function CredixIcon() {
  return (
    <div className="inline-flex flex-col items-center">
      <CalendarIcon className="w-4 h-4 text-orange-600" />
    </div>
  );
}

function PaymentOption(props: {
  order: Order;
  isChecked?: boolean;
  term: string;
}) {
  return (
    <div className="flex gap-4 items-center border-t border-solid border-zinc-200 first:border-none pt-2">
      <RadioGroupItem
        id={`term.${props.term}`}
        checked={props.isChecked}
        value={props.term}
      />
      <label htmlFor={`term.${props.term}`}>
        <div className="flex items-center">
          <CredixIcon />{" "}
          <span className="ml-2 text-lg font-medium">
            Pix em {props.term} dias
          </span>
          <span className="ml-2 text-lg text-zinc-400">
            Compre agora, page depois
          </span>
        </div>
        <div className="text-lg font-medium">
          {formatCurrency(computeTotal(props.order))}
        </div>
      </label>
    </div>
  );
}
