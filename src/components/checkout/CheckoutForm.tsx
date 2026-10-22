"use client";

import { useState } from "react";
import { CreditCard, Check } from "lucide-react";
import { fcfa } from "../../lib/dashboard-data";
import { paymentMethods } from "../../lib/mock-data";

export type Buyer = { name: string; email: string; phone: string; country: string; method: string };

export const countries = [
  { name: "Sénégal", dial: "+221" },
  { name: "Côte d'Ivoire", dial: "+225" },
  { name: "Cameroun", dial: "+237" },
  { name: "Mali", dial: "+223" },
  { name: "Bénin", dial: "+229" },
  { name: "Burkina Faso", dial: "+226" },
  { name: "Togo", dial: "+228" },
  { name: "Gabon", dial: "+241" },
];

const input = "mt-2 w-full rounded-btn border bg-white px-3.5 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function CheckoutForm({ value, price, onChange, onSubmit }: { value: Buyer; price: number; onChange: (b: Buyer) => void; onSubmit: () => void }) {
  const [errors, setErrors] = useState<Partial<Record<keyof Buyer, string>>>({});
  const set = (k: keyof Buyer, v: string) => { onChange({ ...value, [k]: v }); if (errors[k]) setErrors({ ...errors, [k]: undefined }); };
  const dial = countries.find((c) => c.name === value.country)?.dial;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (value.name.trim().length < 3) er.name = "Veuillez indiquer votre nom complet.";
    if (!/^\S+@\S+\.\S+$/.test(value.email)) er.email = "Veuillez saisir une adresse e-mail valide.";
    if (value.phone.replace(/\D/g, "").length < 8) er.phone = "Veuillez saisir un numéro de téléphone valide.";
    if (!value.method) er.method = "Veuillez choisir un moyen de paiement.";
    setErrors(er);
    if (Object.keys(er).length === 0) onSubmit();
  };

  const field = (k: keyof Buyer) => ({
    "aria-invalid": !!errors[k],
    className: `${input} ${errors[k] ? "border-danger" : "border-line"}`,
  });
  const err = (k: keyof Buyer) => errors[k] && <p role="alert" className="mt-1.5 text-sm text-danger">{errors[k]}</p>;

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      <section className="rounded-card border border-line bg-white p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-lg font-bold">Vos informations</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="text-sm font-semibold">Nom complet</label>
            <input id="name" autoComplete="name" value={value.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex. : Fatou Sène" {...field("name")} />
            {err("name")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="text-sm font-semibold">Adresse e-mail</label>
            <input id="email" type="email" autoComplete="email" value={value.email} onChange={(e) => set("email", e.target.value)} placeholder="vous@exemple.com" {...field("email")} />
            {err("email")}
          </div>
          <div>
            <label htmlFor="country" className="text-sm font-semibold">Pays</label>
            <select id="country" value={value.country} onChange={(e) => set("country", e.target.value)} className={`${input} border-line`}>
              {countries.map((c) => <option key={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-semibold">Téléphone</label>
            <div className="relative">
              <span className="num pointer-events-none absolute left-3.5 top-[1.15rem] text-base text-ink-2">{dial}</span>
              <input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" value={value.phone} onChange={(e) => set("phone", e.target.value)} placeholder="77 123 45 67" {...field("phone")} className={`${field("phone").className} num pl-[4.25rem]`} />
            </div>
            {err("phone")}
          </div>
        </div>
      </section>

      <section className="rounded-card border border-line bg-white p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-lg font-bold" id="pay">Moyen de paiement</h2>
        <div role="radiogroup" aria-labelledby="pay" className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {paymentMethods.map((m) => {
            const on = value.method === m.name;
            const card = m.name === "Carte bancaire";
            return (
              <button
                type="button"
                key={m.name}
                role="radio"
                aria-checked={on}
                onClick={() => set("method", m.name)}
                className={`relative flex min-h-[104px] flex-col items-center justify-center gap-3 rounded-card border-2 px-3 py-4 text-sm font-semibold transition-colors ${on ? "border-primary bg-primary-light" : "border-line bg-white hover:border-ink/30"}`}
              >
                {on && <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-white"><Check size={12} /></span>}
                {card ? (
                  <span className="flex size-10 items-center justify-center rounded-full bg-ink text-white"><CreditCard size={20} /></span>
                ) : (
                  <span className="flex size-10 items-center justify-center rounded-full font-heading text-sm font-extrabold" style={{ background: m.color, color: m.name === "MTN MoMo" ? "#1C1917" : "#fff" }}>
                    {m.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                )}
                {m.name}
              </button>
            );
          })}
        </div>
        {err("method")}
        {value.method && (
          <p className="mt-4 rounded-btn bg-page px-4 py-3 text-sm text-ink-2">
            {value.method === "Carte bancaire"
              ? "Vous saisirez les informations de votre carte sur une page sécurisée."
              : `Une demande de paiement sera envoyée sur votre numéro ${value.method}. Gardez votre téléphone à portée de main.`}
          </p>
        )}
      </section>

      <button type="submit" className="num w-full rounded-btn bg-primary px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-primary-hover">
        Payer {fcfa(price)}
      </button>
    </form>
  );
}
