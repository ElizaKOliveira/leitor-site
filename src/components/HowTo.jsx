import Reveal from "./Reveal";
export default function HowTo({ t }) {
  return (
    <Reveal id="how" lang={t.lang} className="page">
      <h2>{t.how.title}</h2>
      <p className="sub">{t.how.subtitle}</p>
      <ol className="steps">
        {t.how.steps.map((s, i) => (
          <li key={i} className="card step">
            <span className="num">{i + 1}</span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}