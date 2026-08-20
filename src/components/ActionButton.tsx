interface ActionButtonProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  color?: string;
}
type ButtonVariant = "blanco" | "rosa";

export default function ActionButton({ text, onClick, icon, color }: ActionButtonProps) {
    const baseStyle = "border-2 px-8 py-4 rounded transition-all duration-300 hover:scale-105 transition cursor-pointer";
    const variantStyles: Record<ButtonVariant, string> = {
        blanco: "border-black bg-white hover:bg-gray-800 text-black hover:text-white",
        rosa: "border-brand-rosa hover:border-gray-800 bg-brand-rosa hover:bg-gray-800 text-white",
    };
    return(
        <button
        onClick={onClick}
        className={baseStyle + " " + variantStyles[color as ButtonVariant || "blanco"]}
        >
        {text}
        {icon}
        </button>
    )
}