export default function DecorationCircles() {
  return (
    <div className="pointer-events-none absolute w-[420px] h-[420px] top-[65%] left-[60%]">

      {/* círculo grande */}
      <div className="
        absolute
        left-0
        top-12
        w-272
        h-272
        rounded-full
        bg-brand-rosa/12
      " />

      {/* círculo borde */}
      <div className="
        absolute
        right-[20%]
        top-0
        w-156
        h-156
        rounded-full
        border
        border-black/15
      " />

      {/* cuadrado */}
      <div className="
        absolute
        right-5
        bottom-10
        top-44
        w-228
        h-228
        rotate-12
        border
        border-brand-rosa/30
      " />

    </div>
  );
}