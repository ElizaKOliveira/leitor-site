import { Globe } from "./Icons";

export default function Header({ lang, setLang, active, go, t }) {
  const items = [
    ["home", t.nav.home],
    ["how", t.nav.how],
    ["install", t.nav.install],
    ["contact", t.nav.contact],
  ];

  return (
    <header className="header">
      <div className="lang">
        <button className={lang === "pt" ? "lang-btn active" : "lang-btn"} onClick={() => setLang("pt")}>
          <Globe /> PT
        </button>
        <button className={lang === "en" ? "lang-btn active" : "lang-btn"} onClick={() => setLang("en")}>
          <Globe /> EN
        </button>
      </div>

      <nav key={lang} className="nav swap">
        {items.map(([id, label]) => (
          <button key={id} className={active === id ? "nav-btn active" : "nav-btn"} onClick={() => go(id)}>
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}