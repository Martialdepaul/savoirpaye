"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Summary from "./Summary";
import CheckoutForm, { countries, type Buyer } from "./CheckoutForm";
import { Success } from "./Result";
import { productUrl, type CatalogProduct } from "../../lib/catalog";
import { useSession } from "../../lib/auth-client";
import { createOrder } from "../../app/actions/orders";

export default function CheckoutFlow({ product }: { product: CatalogProduct }) {
  const { data } = useSession();
  const [buyer, setBuyer] = useState<Buyer>({ name: "", email: "", phone: "", country: "Sénégal", method: "" });
  const [prefilled, setPrefilled] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ ref: string; paid: boolean } | null>(null);

  // Utilisateur connecté : nom et e-mail préremplis
  if (data && !prefilled) {
    setPrefilled(true);
    setBuyer((b) => ({ ...b, name: b.name || data.user.name, email: b.email || data.user.email }));
  }

  const submit = async () => {
    setSending(true);
    setError("");
    const dial = countries.find((c) => c.name === buyer.country)?.dial ?? "";
    const res = await createOrder({ productSlug: product.slug, name: buyer.name, email: buyer.email, phone: `${dial} ${buyer.phone}`.trim(), method: buyer.method }).catch(() => null);
    setSending(false);
    if (!res || !res.ok) return setError(res && !res.ok ? res.error : "Connexion impossible. Vérifiez votre réseau et réessayez.");
    setDone({ ref: res.ref, paid: res.paid });
    window.scrollTo({ top: 0 });
  };

  if (done) return <main className="mx-auto max-w-5xl px-4 py-8 sm:px-5 sm:py-12"><Success buyer={buyer} product={product} orderRef={done.ref} paid={done.paid} /></main>;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-5 sm:py-12">
      <Link href={productUrl(product)} className="-ml-1 mb-2 inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-ink-2 hover:text-ink"><ArrowLeft size={16} /> Retour au produit</Link>
      <h1 className="mb-6 font-heading text-3xl font-extrabold">{product.price === 0 ? "Obtenir ce produit" : "Finaliser votre commande"}</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-10">
        <div className="order-2 lg:order-1">
          <CheckoutForm value={buyer} price={product.price} onChange={setBuyer} onSubmit={submit} sending={sending} error={error} sellerName={product.seller.name} />
        </div>
        <div className="order-1 lg:sticky lg:top-6 lg:order-2"><Summary product={product} /></div>
      </div>
    </main>
  );
}
