import { formatCurrency } from '../lib/utils';

export function LineItem(props: {
  description: string;
  amount: number;
  ammountClassName?: string;
}) {
  const { ammountClassName = 'font-medium' } = props;

  return (
    <div className="flex justify-between">
      <div>{props.description}</div>
      <div className={ammountClassName}>{formatCurrency(props.amount)}</div>
    </div>
  );
}
