export default function DecorationSquares() {
  return (
    <div
      className="pointer-events-none
        absolute
            top-[13%] left-[-6%]
            rotate-12
            opacity-70
            z-0"
    >
      {/* Cuadrado rosa */}
      <div className="absolute w-260 h-260 bg-brand-rosa/15 rotate-45" />

      {/* Marco */}
      <div className="absolute left-10 top-8 w-252 h-252 border border-black/20 rotate-[18deg]" />
    </div>
  );
}