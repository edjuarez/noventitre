import { LoaderCircle } from "lucide-react";

interface SpinnerProps {
  size?: number;
  label?: string;
  className?: string;
}

export default function Spinner({
  size = 32,
  label,
  className = "",
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-4
        ${className}
      `}
    >
      <LoaderCircle
        className="animate-spin text-neutral-600"
        size={size}
        aria-hidden="true"
      />

      {label && <p className="text-sm text-neutral-500">{label}</p>}
    </div>
  );
}
