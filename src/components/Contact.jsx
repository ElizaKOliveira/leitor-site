import Reveal from "./Reveal";
import { useState } from "react";

const EMAIL = "elizakyoliveira@gmail.com";

export default function Contact({ t }) {
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(`${f.msg}\n\n${f.name} (${f.email})`);
    window.location.href = `mailto:${EMAIL}?subject=IntegraCar&body=${body}`;
    setSent(true);
  };

  return (
    <Reveal id="contact" lang={t.lang} className="page narrow">
      <h2>{t.contact.title}</h2>
      <p className="sub">{t.contact.subtitle}</p>
      <form className="card form" onSubmit={submit}>
        <input required placeholder={t.contact.name} value={f.name} onChange={set("name")} />
        <input required type="email" placeholder={t.contact.email} value={f.email} onChange={set("email")} />
        <textarea required rows="5" placeholder={t.contact.msg} value={f.msg} onChange={set("msg")} />
        <button className="cta" type="submit">{t.contact.send}</button>
        {sent && <small>{t.contact.sent}</small>}
      </form>
    </Reveal>
  );
}