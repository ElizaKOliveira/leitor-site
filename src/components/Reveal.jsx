import { useEffect, useRef, useState } from "react";

export default function Reveal({ id, lang, className = "", children }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`${className} reveal ${shown ? "in" : ""}`}>
      <div key={lang} className="swap">{children}</div>
    </section>
  );
}