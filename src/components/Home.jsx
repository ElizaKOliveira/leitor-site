import { Download } from "./Icons";
import Tilt from "./Tilt";

export default function Home({ t }) {
  return (
    <section id="home" className="home">
      <img className="leaf l1" src="/leaf.png" alt="" />
      <img className="leaf l2" src="/leaf.png" alt="" />

      <div key={t.lang} className="home-text">
        <h1>
          {t.home.title1}
          <span>{t.home.title2}</span>
        </h1>
        <p>{t.home.text}</p>
        <a className="cta" href="https://github.com/ElizaKOliveira/integracar-processos/releases/download/v1.0.0/Setup-LeitorDeProcessos-1.0.0.exe" download>
          <Download /> {t.home.cta}
        </a>
      </div>

      <div className="hero-img">
        <Tilt>
          <img src="/app-preview.png" alt="IntegraCar" draggable="false" />
        </Tilt>
      </div>
    </section>
  );
}