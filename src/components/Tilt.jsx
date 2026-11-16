import { useRef } from "react";

export default function Tilt({ children, max = 10 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--ry", `${x * max}deg`);
    ref.current.style.setProperty("--rx", `${-y * max}deg`);
  };

  const onLeave = () => {
    ref.current.style.setProperty("--ry", "0deg");
    ref.current.style.setProperty("--rx", "0deg");
  };

  return (
    <div className="tilt-wrap" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="tilt" ref={ref}>{children}</div>
    </div>
  );
}