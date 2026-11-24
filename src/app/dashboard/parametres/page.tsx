"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Check, Copy, Edit2, ExternalLink, Laptop, Loader2, Smartphone, Store, Trash2, X } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { PasswordInput, passwordOk, PasswordStrength as Rules } from "@/components/auth/fields";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import { UserAvatar } from "@/components/dashboard/Sidebar";
import { useAccount } from "@/components/dashboard/AccountContext";
import { authClient, authErrorMessage, useSession } from "@/lib/auth-client";
import { updatePayouts, updateShop } from "@/app/actions/shop";
import { mobileMoney } from "@/lib/mock-data";
import { shopCategories } from "@/lib/site-data";
import { site } from "@/lib/site-config";

type Notify = (msg: string) => void;

const tabs = [
  { id: "profil", label: "Profil" },
  { id: "boutique", label: "Boutique" },
  { id: "paiements", label: "Paiements" },
  { id: "securite", label: "Sécurité" },
] as const;
type TabId = (typeof tabs)[number]["id"];

const fieldCls = "w-full rounded-btn border border-line bg-white px-4 py-3 text-base focus:border-primary focus:outline-none sm:text-sm";
const primaryBtn = "inline-flex min-h-11 items-center justify-center gap-2 rounded-btn bg-primary px-5 font-bold text-white hover:bg-primary-hover disabled:opacity-60";
const secondaryBtn = "inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-line bg-white px-4 text-sm font-semibold text-ink hover:bg-page disabled:opacity-60";

function InputField({ label, id, hint, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string; hint?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <input id={id} className={`${fieldCls} read-only:bg-page read-only:text-ink-2`} {...props} />
      {hint && <p className="mt-1.5 text-xs text-ink-2">{hint}</p>}
    </div>
  );
}

function ErrorText({ children }: { children?: string }) {
  return children ? <p role="alert" className="text-sm text-danger">{children}</p> : null;
}

function NoShop() {
  return (
    <div className="rounded-card border border-dashed border-line p-6 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold-light text-gold-ink"><Store size={22} /></span>
      <p className="mt-3 font-semibold">Vous n'avez pas encore de boutique</p>
      <p className="mt-1 text-sm text-ink-2">Créez-la en 1 minute : nom, catégorie et moyen de retrait.</p>
      <Link href="/onboarding" className={`${primaryBtn} mt-4`}>Créer ma boutique</Link>
    </div>
  );
}

/* ---------------- Profil ---------------- */

function TabProfil({ notify }: { notify: Notify }) {
  const router = useRouter();
  const account = useAccount()!;
  const [name, setName] = useState(account.user.name);
  const [phone, setPhone] = useState(account.user.phone ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (name.trim().length < 3) return setError("Indiquez votre nom complet.");
    if (phone && phone.replace(/\D/g, "").length < 8) return setError("Saisissez un numéro WhatsApp valide.");
    setSaving(true);
    setError("");
    const { error } = await authClient.updateUser({ name: name.trim(), phone: phone.trim() });
    setSaving(false);
    if (error) return setError(authErrorMessage(error));
    notify("Profil enregistré");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <UserAvatar className="size-16 text-xl" />
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{account.user.name}</p>
          <p className="text-sm text-ink-2">{account.user.image ? "Photo de votre compte Google" : "Vos initiales servent de photo de profil"}</p>
        </div>
      </div>

      <InputField label="Nom complet" id="nom" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); setError(""); }} />
      <InputField label="Adresse e-mail" id="email" type="email" value={account.user.email} readOnly
        hint={account.user.emailVerified ? "Adresse confirmée. Elle sert à vous connecter et à recevoir vos notifications." : "Adresse pas encore confirmée : utilisez le lien reçu par e-mail."} />
      <InputField label="Numéro WhatsApp" id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+221 77 123 45 67" value={phone}
        onChange={(e) => { setPhone(e.target.value); setError(""); }} hint="Affiché sur votre boutique pour que vos clients puissent vous écrire." />
      <ErrorText>{error}</ErrorText>
      <button onClick={save} disabled={saving} className={primaryBtn}>
        {saving && <Loader2 size={16} className="animate-spin" />} Enregistrer les modifications
      </button>
    </div>
  );
}

/* ---------------- Boutique ---------------- */

function TabBoutique({ notify }: { notify: Notify }) {
  const router = useRouter();
  const shop = useAccount()?.shop;
  const [name, setName] = useState(shop?.name ?? "");
  const [desc, setDesc] = useState(shop?.description ?? "");
  const [category, setCategory] = useState(shop?.category || shopCategories[0]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  if (!shop) return <NoShop />;
  const url = `${site.url}/boutique/${shop.slug}`;

  const save = async () => {
    setSaving(true);
    setError("");
    const res = await updateShop({ name, description: desc, category }).catch(() => null);
    setSaving(false);
    if (!res) return setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    if (!res.ok) return setError(res.error);
    notify("Boutique enregistrée");
    router.refresh();
  };

  return (
    <div className="space-y-5">
      <InputField label="Nom de la boutique" id="nom-boutique" maxLength={60} value={name} onChange={(e) => { setName(e.target.value); setError(""); }} />
      <div>
        <label htmlFor="desc-boutique" className="mb-1.5 block text-sm font-semibold text-ink">Description</label>
        <textarea id="desc-boutique" rows={4} maxLength={600} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Présentez-vous et dites à vos clients ce qu'ils vont apprendre avec vous." className={fieldCls} />
        <p className="num mt-1 text-right text-xs text-ink-2">{desc.length} / 600</p>
      </div>

      <div>
        <label htmlFor="url-boutique" className="mb-1.5 block text-sm font-semibold text-ink">Adresse de la boutique</label>
        <div className="flex items-center gap-2">
          <input id="url-boutique" readOnly value={url.replace(/^https?:\/\//, "")} className="min-w-0 flex-1 rounded-btn border border-line bg-page px-4 py-3 text-sm text-ink-2" />
          <button
            onClick={() => navigator.clipboard.writeText(url).then(() => notify("Adresse copiée"), () => notify("Copie impossible"))}
            className="flex size-11 shrink-0 items-center justify-center rounded-btn border border-line bg-white text-ink-2 hover:text-ink"
            aria-label="Copier l'adresse de la boutique"
          >
            <Copy size={16} />
          </button>
        </div>
        <p className="mt-1.5 text-xs text-ink-2">Partagez ce lien sur WhatsApp, Facebook ou Instagram. Il ne change pas si vous renommez la boutique.</p>
      </div>

      <div>
        <label htmlFor="categorie" className="mb-1.5 block text-sm font-semibold text-ink">Catégorie principale</label>
        <select id="categorie" value={category} onChange={(e) => setCategory(e.target.value)} className={fieldCls}>
          {shopCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <ErrorText>{error}</ErrorText>
      <div className="flex flex-wrap gap-3">
        <button onClick={save} disabled={saving} className={primaryBtn}>{saving && <Loader2 size={16} className="animate-spin" />} Enregistrer</button>
        <Link href={`/boutique/${shop.slug}`} className={secondaryBtn}><ExternalLink size={15} /> Voir ma boutique</Link>
      </div>
    </div>
  );
}

/* ---------------- Paiements ---------------- */

const operators = [...mobileMoney.map((m) => m.name), "Virement bancaire"];

function TabPaiements({ notify }: { notify: Notify }) {
  const router = useRouter();
  const shop = useAccount()?.shop;
  const [accounts, setAccounts] = useState(shop?.payouts ?? []);
  const [autoWithdraw, setAutoWithdraw] = useState(shop?.autoWithdraw ?? false);
  // Formulaire : null = fermé, "" = nouveau compte, sinon id du compte modifié
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ method: operators[0], number: "" });
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  if (!shop) return <NoShop />;

  const persist = async (next: typeof accounts, nextAuto: boolean, msg: string) => {
    setSaving(true);
    const res = await updatePayouts({ payouts: next, autoWithdraw: nextAuto }).catch(() => null);
    setSaving(false);
    if (!res || !res.ok) {
      setFormError(res && !res.ok ? res.error : "Connexion impossible. Réessayez.");
      return false;
    }
    setAccounts(next);
    setAutoWithdraw(nextAuto);
    notify(msg);
    router.refresh();
    return true;
  };

  const openForm = (id: string) => {
    const a = accounts.find((x) => x.id === id);
    setForm(a ? { method: a.method, number: a.number } : { method: operators[0], number: "" });
    setFormError("");
    setEditing(id);
  };
  const saveForm = async () => {
    if (form.number.replace(/\W/g, "").length < 8) return setFormError("Saisissez un numéro ou un compte valide.");
    const next = editing ? accounts.map((a) => (a.id === editing ? { ...a, ...form } : a)) : [...accounts, { id: "", ...form }];
    if (await persist(next, autoWithdraw, editing ? "Compte modifié" : "Compte ajouté")) setEditing(null);
  };
  const remove = async (id: string) => {
    if (accounts.length === 1) return notify("Gardez au moins un compte pour recevoir vos gains");
    if (!window.confirm("Supprimer ce compte de retrait ?")) return;
    await persist(accounts.filter((a) => a.id !== id), autoWithdraw, "Compte supprimé");
  };

  const accountForm = (
    <div className="rounded-card border border-primary/40 bg-primary-light/40 p-4">
      <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
        <div>
          <label htmlFor="acc-method" className="mb-1.5 block text-sm font-semibold text-ink">Moyen de retrait</label>
          <select id="acc-method" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className={fieldCls}>
            {operators.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="acc-number" className="mb-1.5 block text-sm font-semibold text-ink">{form.method === "Virement bancaire" ? "IBAN ou numéro de compte" : "Numéro"}</label>
          <input id="acc-number" type={form.method === "Virement bancaire" ? "text" : "tel"} inputMode={form.method === "Virement bancaire" ? "text" : "tel"} value={form.number}
            onChange={(e) => { setForm({ ...form, number: e.target.value }); setFormError(""); }} placeholder="+221 77 123 45 67" aria-invalid={!!formError}
            className={`${fieldCls} ${formError ? "border-danger" : ""}`} />
        </div>
      </div>
      {formError && <p role="alert" className="mt-2 text-sm text-danger">{formError}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={saveForm} disabled={saving} className={`${primaryBtn} px-4 text-sm`}>{saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Enregistrer</button>
        <button onClick={() => setEditing(null)} className={secondaryBtn}><X size={16} /> Annuler</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 font-heading font-bold text-ink">Comptes de retrait</h3>
        <p className="mb-3 text-sm text-ink-2">Vos gains sont versés sur ces comptes. Le premier est utilisé par défaut.</p>
        <ul className="space-y-3">
          {accounts.map((a, i) => editing === a.id ? <li key={a.id}>{accountForm}</li> : (
            <li key={a.id} className="flex items-center justify-between gap-3 rounded-card border border-line bg-white p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">{a.method.charAt(0)}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{a.method} {i === 0 && <span className="ml-1 rounded-full bg-[#ECF8EF] px-2 py-0.5 text-xs font-bold text-success">Par défaut</span>}</p>
                  <p className="truncate text-sm text-ink-2">{a.number}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center">
                <button onClick={() => openForm(a.id)} className="flex size-11 items-center justify-center rounded-lg text-ink-2 hover:bg-page hover:text-ink" aria-label={`Modifier le compte ${a.method}`}><Edit2 size={15} /></button>
                <button onClick={() => remove(a.id)} disabled={saving} className="flex size-11 items-center justify-center rounded-lg text-danger hover:bg-[#FCEDED]" aria-label={`Supprimer le compte ${a.method}`}><Trash2 size={15} /></button>
              </div>
            </li>
          ))}
        </ul>
        {editing === "" ? <div className="mt-3">{accountForm}</div> : accounts.length < 5 && (
          <button onClick={() => openForm("")} className={`${secondaryBtn} mt-3`}>+ Ajouter un compte</button>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 rounded-card border border-line bg-white p-4">
        <div>
          <p className="font-semibold text-ink">Retrait automatique à 100 000 FCFA</p>
          <p className="text-sm text-ink-2">Déclenche un retrait vers votre compte par défaut dès que votre solde atteint ce seuil.</p>
        </div>
        <button
          onClick={() => persist(accounts, !autoWithdraw, autoWithdraw ? "Retrait automatique désactivé" : "Retrait automatique activé")}
          disabled={saving}
          role="switch"
          aria-checked={autoWithdraw}
          aria-label="Retrait automatique"
          className="flex min-h-11 shrink-0 items-center"
        >
          <span className={`relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors ${autoWithdraw ? "bg-primary" : "bg-line"}`}>
            <span className={`inline-block size-5 rounded-full bg-white shadow transition-transform ${autoWithdraw ? "translate-x-5" : "translate-x-0"}`} />
          </span>
        </button>
      </div>
    </div>
  );
}

/* ---------------- Sécurité ---------------- */

type SessionRow = { id: string; token: string; userAgent?: string | null; createdAt: Date | string; updatedAt?: Date | string };

const deviceLabel = (ua?: string | null) => {
  if (!ua) return { name: "Appareil inconnu", mobile: false };
  const mobile = /Android|iPhone|iPad|Mobile/i.test(ua);
  const os = /Android/i.test(ua) ? "Android" : /iPhone|iPad/i.test(ua) ? "iPhone" : /Windows/i.test(ua) ? "Windows" : /Mac OS/i.test(ua) ? "Mac" : /Linux/i.test(ua) ? "Linux" : "";
  const browser = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "Navigateur";
  return { name: os ? `${browser}, ${os}` : browser, mobile };
};
const when = (d: Date | string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

function TabSecurite({ notify }: { notify: Notify }) {
  const router = useRouter();
  const account = useAccount()!;
  const { data: current } = useSession();
  const [linked, setLinked] = useState<{ providerId: string; accountId: string }[] | null>(null);
  const providers = linked?.map((a) => a.providerId) ?? null;
  const [sessions, setSessions] = useState<SessionRow[] | null>(null);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdError, setPwdError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [googleError, setGoogleError] = useState("");
  const [del, setDel] = useState({ open: false, confirm: "", password: "", error: "" });

  const load = useCallback(async () => {
    const [acc, ses] = await Promise.all([authClient.listAccounts(), authClient.listSessions()]);
    // `id` = identifiant interne du compte lié, attendu par unlinkAccount
    setLinked((acc.data ?? []).map((a: { id: string; providerId: string }) => ({ providerId: a.providerId, accountId: a.id })));
    setSessions((ses.data ?? []) as SessionRow[]);
  }, []);
  useEffect(() => { load(); }, [load]);

  const hasPassword = providers?.includes("credential") ?? false;
  const hasGoogle = providers?.includes("google") ?? false;

  const changePassword = async () => {
    if (!pwd.current) return setPwdError("Saisissez votre mot de passe actuel.");
    if (!passwordOk(pwd.next)) return setPwdError("Le nouveau mot de passe ne respecte pas encore toutes les règles.");
    if (pwd.next !== pwd.confirm) return setPwdError("Les deux mots de passe ne sont pas identiques.");
    setBusy("pwd");
    setPwdError("");
    const { error } = await authClient.changePassword({ currentPassword: pwd.current, newPassword: pwd.next, revokeOtherSessions: true });
    setBusy(null);
    if (error) return setPwdError(error.code === "INVALID_PASSWORD" ? "Mot de passe actuel incorrect." : authErrorMessage(error));
    setPwd({ current: "", next: "", confirm: "" });
    notify("Mot de passe mis à jour. Vos autres appareils ont été déconnectés.");
    load();
  };

  const linkGoogle = async () => {
    setBusy("google");
    setGoogleError("");
    const { error } = await authClient.linkSocial({ provider: "google", callbackURL: "/dashboard/parametres?onglet=securite" });
    if (error) { setBusy(null); setGoogleError(authErrorMessage(error)); }
  };
  const unlinkGoogle = async () => {
    if (!window.confirm("Dissocier votre compte Google ? Vous vous connecterez avec votre e-mail et votre mot de passe.")) return;
    setBusy("google");
    setGoogleError("");
    const google = linked?.find((a) => a.providerId === "google");
    if (!google) return setBusy(null);
    const { error } = await authClient.unlinkAccount({ accountId: google.accountId });
    setBusy(null);
    if (error) return setGoogleError(authErrorMessage(error));
    notify("Compte Google dissocié");
    load();
  };

  const revoke = async (token: string) => {
    setBusy(token);
    await authClient.revokeSession({ token });
    setBusy(null);
    notify("Appareil déconnecté");
    load();
  };

  const deleteAccount = async () => {
    if (del.confirm.trim().toUpperCase() !== "SUPPRIMER") return setDel({ ...del, error: "Tapez SUPPRIMER pour confirmer." });
    if (hasPassword && !del.password) return setDel({ ...del, error: "Saisissez votre mot de passe." });
    setBusy("delete");
    const { error } = await authClient.deleteUser(hasPassword ? { password: del.password, callbackURL: "/" } : { callbackURL: "/" });
    if (error) { setBusy(null); return setDel({ ...del, error: authErrorMessage(error) }); }
    router.push("/");
    router.refresh();
  };

  const currentToken = current?.session.token;

  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-4 font-heading font-bold text-ink">Mot de passe</h3>
        {providers === null ? (
          <p className="flex items-center gap-2 text-sm text-ink-2"><Loader2 size={16} className="animate-spin" /> Chargement…</p>
        ) : hasPassword ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="pwd-current" className="mb-1.5 block text-sm font-semibold text-ink">Mot de passe actuel</label>
              <PasswordInput id="pwd-current" autoComplete="current-password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} />
            </div>
            <div>
              <label htmlFor="pwd-new" className="mb-1.5 block text-sm font-semibold text-ink">Nouveau mot de passe</label>
              <PasswordInput id="pwd-new" autoComplete="new-password" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} />
              <Rules value={pwd.next} />
            </div>
            <div>
              <label htmlFor="pwd-confirm" className="mb-1.5 block text-sm font-semibold text-ink">Confirmer le nouveau mot de passe</label>
              <PasswordInput id="pwd-confirm" autoComplete="new-password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} />
            </div>
            <ErrorText>{pwdError}</ErrorText>
            <button onClick={changePassword} disabled={busy === "pwd"} className={primaryBtn}>{busy === "pwd" && <Loader2 size={16} className="animate-spin" />} Mettre à jour</button>
          </div>
        ) : (
          <div className="rounded-card border border-line bg-white p-4 text-sm text-ink-2">
            Vous vous connectez avec Google, sans mot de passe. Pour pouvoir aussi vous connecter avec <strong className="text-ink">{account.user.email}</strong>, créez un mot de passe :
            <Link href="/mot-de-passe-oublie" className={`${secondaryBtn} mt-3 flex w-fit`}>Créer un mot de passe</Link>
          </div>
        )}
      </section>

      <section>
        <h3 className="mb-4 font-heading font-bold text-ink">Connexion avec Google</h3>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-line bg-white p-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line font-heading text-lg font-bold text-[#4285F4]" aria-hidden="true">G</span>
            <div className="min-w-0">
              <p className="font-semibold text-ink">Compte Google</p>
              <p className="text-sm text-ink-2">{hasGoogle ? "Associé : vous pouvez vous connecter en un clic." : "Connectez-vous en un clic, sans mot de passe."}</p>
            </div>
          </div>
          {providers !== null && (hasGoogle ? (
            hasPassword && <button onClick={unlinkGoogle} disabled={busy === "google"} className={secondaryBtn}>Dissocier</button>
          ) : (
            <button onClick={linkGoogle} disabled={busy === "google"} className={secondaryBtn}>{busy === "google" && <Loader2 size={15} className="animate-spin" />} Associer</button>
          ))}
        </div>
        <div className="mt-2"><ErrorText>{googleError}</ErrorText></div>
      </section>

      <section>
        <h3 className="mb-1 font-heading font-bold text-ink">Appareils connectés</h3>
        <p className="mb-4 text-sm text-ink-2">Un appareil que vous ne reconnaissez pas ? Déconnectez-le puis changez votre mot de passe.</p>
        {sessions === null ? (
          <p className="flex items-center gap-2 text-sm text-ink-2"><Loader2 size={16} className="animate-spin" /> Chargement…</p>
        ) : (
          <ul className="space-y-3">
            {sessions.map((s) => {
              const d = deviceLabel(s.userAgent);
              const mine = s.token === currentToken;
              return (
                <li key={s.id} className="flex items-center justify-between gap-3 rounded-card border border-line bg-white p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-page text-ink-2">{d.mobile ? <Smartphone size={17} /> : <Laptop size={17} />}</span>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{d.name}</p>
                      <p className="text-sm text-ink-2">Connecté le {when(s.createdAt)}</p>
                    </div>
                  </div>
                  {mine ? (
                    <span className="shrink-0 rounded-full bg-[#ECF8EF] px-2.5 py-1 text-xs font-bold text-success">Cet appareil</span>
                  ) : (
                    <button onClick={() => revoke(s.token)} disabled={busy === s.token} className={`${secondaryBtn} shrink-0 text-xs`}>Déconnecter</button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="rounded-card border border-danger/30 bg-white p-4 sm:p-6">
        <h3 className="mb-1 font-heading font-bold text-danger">Supprimer mon compte</h3>
        <p className="mb-4 text-sm text-ink-2">Votre compte et votre boutique seront supprimés définitivement. Cette action est irréversible.</p>
        {!del.open ? (
          <button onClick={() => setDel({ ...del, open: true })} className="min-h-11 rounded-btn border border-danger px-5 text-sm font-bold text-danger hover:bg-[#FCEDED]">Supprimer mon compte</button>
        ) : (
          <div className="space-y-3">
            <InputField label="Tapez SUPPRIMER pour confirmer" id="del-confirm" autoComplete="off" value={del.confirm} onChange={(e) => setDel({ ...del, confirm: e.target.value, error: "" })} />
            {hasPassword && (
              <div>
                <label htmlFor="del-pwd" className="mb-1.5 block text-sm font-semibold text-ink">Mot de passe</label>
                <PasswordInput id="del-pwd" autoComplete="current-password" value={del.password} onChange={(e) => setDel({ ...del, password: e.target.value, error: "" })} />
              </div>
            )}
            <ErrorText>{del.error}</ErrorText>
            <div className="flex flex-wrap gap-2">
              <button onClick={deleteAccount} disabled={busy === "delete"} className="inline-flex min-h-11 items-center gap-2 rounded-btn bg-danger px-5 text-sm font-bold text-white disabled:opacity-60">
                {busy === "delete" && <Loader2 size={16} className="animate-spin" />} Supprimer définitivement
              </button>
              <button onClick={() => setDel({ open: false, confirm: "", password: "", error: "" })} className={secondaryBtn}>Annuler</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function ParametresPage() {
  const [tab, setTab] = useState<TabId>("profil");
  const [toast, notify] = useToast();

  // Onglet demandé dans l'URL (?onglet=securite), par exemple au retour de Google
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("onglet");
    if (tabs.some((x) => x.id === t)) setTab(t as TabId);
  }, []);

  return (
    <div className="min-h-screen">
      <Sidebar active="Paramètres" />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-3xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Paramètres</h1>
            <p className="mt-1 text-sm text-ink-2">Gérez votre compte, votre boutique et vos retraits.</p>
          </div>

          <div className="rounded-card border border-line bg-white shadow-soft">
            <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-line px-2 sm:px-6">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  role="tab"
                  aria-selected={tab === t.id}
                  className={`min-h-12 whitespace-nowrap border-b-2 px-3 text-sm font-semibold transition-colors sm:px-4 ${tab === t.id ? "border-primary text-primary" : "border-transparent text-ink-2 hover:text-ink"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="p-4 sm:p-6">
              {tab === "profil" && <TabProfil notify={notify} />}
              {tab === "boutique" && <TabBoutique notify={notify} />}
              {tab === "paiements" && <TabPaiements notify={notify} />}
              {tab === "securite" && <TabSecurite notify={notify} />}
            </div>
          </div>
        </main>
      </div>
      <BottomNav active="Paramètres" />
      {toast}
    </div>
  );
}
