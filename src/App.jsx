import { useEffect, useState } from "react";
import { dict } from "./i18n";
import Header from "./components/Header";
import Home from "./components/Home";
import HowTo from "./components/HowTo";
import Install from "./components/Install";
import Contact from "./components/Contact";
import Guide from "./components/Guide";

const IDS = ["home", "how", "install", "contact"];

export default function App() {
  const [lang, setLang] = useState("pt");
  const [active, setActive] = useState("home");
  const [view, setView] = useState("site");
  const t = { ...dict[lang], lang };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const openGuide = () => {
    setView("guide");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const closeGuide = () => {
    setView("site");
    setTimeout(() => document.getElementById("install")?.scrollIntoView({ behavior: "instant" }), 0);
  };

  return (
    <div className="app">
      {view === "site" && <Header lang={lang} setLang={setLang} active={active} go={go} t={t} />}

      <main hidden={view === "guide"}>
        <Home t={t} />
        <HowTo t={t} />
        <Install t={t} openGuide={openGuide} />
        <Contact t={t} />
      </main>

      {view === "guide" && <Guide t={t} onBack={closeGuide} />}
      <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} IFES Campus Serra.</p>
        <div className="footer-links">
          <a href="#termos">Termos de Uso</a>
          <a href="#privacidade">Privacidade</a>
          <a href="#contato">Contato</a>
        </div>
      </div>
    </footer>
    </div>
  );
}