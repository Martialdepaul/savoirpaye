"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const subjects = ["Question générale", "Je suis créateur", "Paiements et retraits", "Partenariat", "Presse"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-card border border-line bg-white p-8 text-center shadow-soft sm:p-10">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary-light text-primary"><CheckCircle2 size={32} /></span>
        <h2 className="mt-5 font-heading text-2xl font-extrabold">Message envoyé !</h2>
        <p className="mt-2 max-w-sm text-ink-2">Merci de nous avoir écrit. Notre équipe vous répond sous 24 h ouvrées, par e-mail ou sur WhatsApp.</p>
        <button onClick={() => setSent(false)} className="mt-6 rounded-btn border border-line px-5 py-2.5 text-sm font-semibold hover:bg-page">
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const input = "w-full rounded-btn border border-line bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="space-y-4 rounded-card border border-line bg-white p-5 shadow-soft sm:p-8"
    >
      <h2 className="font-heading text-xl font-bold">Écrivez-nous</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Nom complet</span>
          <input required name="name" autoComplete="name" className={input} placeholder="Aïssata Traoré" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">E-mail</span>
          <input required type="email" name="email" autoComplete="email" className={input} placeholder="vous@exemple.com" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Téléphone <span className="font-normal text-ink-2">(facultatif)</span></span>
          <input type="tel" name="phone" autoComplete="tel" className={input} placeholder="+221 77 000 00 00" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Sujet</span>
          <select name="subject" className={input}>
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Message</span>
        <textarea required name="message" rows={5} className={input} placeholder="Comment pouvons-nous vous aider ?" />
      </label>
      <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-btn bg-primary px-6 py-3.5 font-semibold text-white hover:bg-primary-hover sm:w-auto">
        Envoyer le message <Send size={16} />
      </button>
    </form>
  );
}
