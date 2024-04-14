import { cn } from "../../lib/utils";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function Card({ className, children }: Props) {
  return (
    <div className={cn("bg-white rounded-md p-4 shadow-md", className)}>
      {children}
    </div>
  );
}
