import { Download, Book } from "./Icons";
import Reveal from "./Reveal";

export default function Install({ t, openGuide }) {
  return (
    <Reveal id="install" lang={t.lang} className="page">
      <h2>{t.install.title}</h2>
      <p className="sub">{t.install.subtitle}</p>
      <div className="install-grid">
        <div className="install-list">
          {t.install.steps.map((s, i) => (
            <div key={i} className="card row">
              <span className="num">{i + 1}</span>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <aside className="card req">
          <p>{t.install.req}</p>
          <div className="req-actions">
            <a className="cta" href="https://github.com/ElizaKOliveira/integracar-processos/releases/download/v1.0.0/Setup-LeitorDeProcessos-1.0.0.exe" download>
              <Download /> {t.home.cta}
            </a>
            <button type="button" className="cta ghost" onClick={openGuide}>
              <Book /> {t.install.guide}
            </button>
          </div>
        </aside>
      </div>
    </Reveal>
  );
}