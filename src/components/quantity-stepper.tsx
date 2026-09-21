import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  quantity,
  onChange,
  label,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  label: string;
}) {
  return (
    <div className="flex items-center border border-line">
      <button
        type="button"
        aria-label={`Decrease quantity of ${label}`}
        onClick={() => onChange(quantity - 1)}
        className="flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-glow"
      >
        <Minus className="size-3.5" />
      </button>
      <span
        aria-live="polite"
        className="min-w-9 text-center font-display text-base tabular-nums text-foreground"
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label={`Increase quantity of ${label}`}
        onClick={() => onChange(quantity + 1)}
        className="flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-glow"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
