"use client";

import { useState } from "react";
import { Copy, Trash2, Edit2, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { passwordOk, PasswordStrength as Rules } from "@/components/auth/fields";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";

type Notify = (msg: string) => void;

const tabs = [
  { id: "profil", label: "Profil" },
  { id: "boutique", label: "Boutique" },
  { id: "paiements", label: "Paiements" },
  { id: "securite", label: "Sécurité" },
];

function InputField({ label, id, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        className="w-full rounded-btn border border-line bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
        {...props}
      />
    </div>
  );
}

function TextareaField({ label, id, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <textarea
        id={id}
        rows={3}
        className="w-full rounded-btn border border-line bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
        {...props}
      />
    </div>
  );
}

function TabProfil({ notify }: { notify: Notify }) {
  const [photo, setPhoto] = useState("");
  const [prenom, setPrenom] = useState("Aminata");
  const [nom, setNom] = useState("Diallo");
  const [email, setEmail] = useState("aminata@savoirpaye.com");
  const [phone, setPhone] = useState("+221 77 000 00 00");
  const [bio, setBio] = useState("Formatrice spécialisée en bureautique et e-commerce à Dakar.");

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        {photo ? (
          <img src={photo} alt="Photo de profil" className="size-20 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-2xl font-bold text-white">
            AD
          </span>
        )}
        <div>
          <p className="font-semibold text-ink">Photo de profil</p>
          <label className="mt-1 inline-flex min-h-11 cursor-pointer items-center rounded-btn border border-line bg-white px-4 text-sm font-medium text-ink-2 hover:text-ink">
            Modifier la photo
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setPhoto(URL.createObjectURL(f)); notify("Photo mise à jour"); } }} />
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Prénom" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        <InputField label="Nom" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
      </div>
      <InputField label="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Téléphone" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <TextareaField label="Bio / À propos" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />

      <div>
        <button onClick={() => notify("Profil enregistré")} className="min-h-11 rounded-btn bg-primary px-5 font-bold text-white hover:bg-primary-hover">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}

function TabBoutique({ notify }: { notify: Notify }) {
  const [nomBoutique, setNomBoutique] = useState("SavoirPay Academy");
  const [desc, setDesc] = useState("Formez-vous aux compétences numériques essentielles pour réussir en Afrique.");
  const [categorie, setCategorie] = useState("Bureautique");
  const url = "savoirpay.com/boutique/aminata-diallo";

  return (
    <div className="space-y-5">
      <InputField label="Nom de la boutique" id="nom-boutique" value={nomBoutique} onChange={(e) => setNomBoutique(e.target.value)} />
      <TextareaField label="Description" id="desc-boutique" value={desc} onChange={(e) => setDesc(e.target.value)} />

      <div>
        <label htmlFor="url-boutique" className="mb-1.5 block text-sm font-semibold text-ink">
          URL de la boutique
        </label>
        <div className="flex items-center gap-2">
          <input
            id="url-boutique"
            readOnly
            value={url}
            className="flex-1 rounded-btn border border-line bg-page px-4 py-3 text-sm text-ink-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(`https://${url}`).then(() => notify("Adresse copiée"), () => {})}
            className="flex size-11 shrink-0 items-center justify-center rounded-btn border border-line bg-white text-ink-2 hover:text-ink"
            title="Copier l'URL"
            aria-label="Copier l'adresse de la boutique"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="categorie" className="mb-1.5 block text-sm font-semibold text-ink">
          Catégorie principale
        </label>
        <select
          id="categorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          className="w-full rounded-btn border border-line bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
        >
          {["Bureautique", "E-commerce", "Finance", "Marketing", "Développement personnel"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => notify("Boutique enregistrée")} className="min-h-11 rounded-btn bg-primary px-5 font-bold text-white hover:bg-primary-hover">
            Enregistrer
          </button>
          <a href="/boutique/aminata-diallo" target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-btn border border-line bg-white px-5 font-semibold text-ink hover:bg-page">
            Voir ma boutique
          </a>
        </div>
      </div>
    </div>
  );
}

const operators = ["Wave", "Orange Money", "Free Money", "MTN MoMo", "Moov Money"];

function TabPaiements({ notify }: { notify: Notify }) {
  const [autoWithdraw, setAutoWithdraw] = useState(false);
  const [accounts, setAccounts] = useState([
    { id: 1, method: "Wave", number: "+221 77 000 00 00", active: true },
    { id: 2, method: "Orange Money", number: "+221 76 000 00 00", active: true },
  ]);
  // Formulaire d'ajout ou de modification : null = fermé, 0 = nouveau compte
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ method: "Wave", number: "" });
  const [formError, setFormError] = useState("");

  const openForm = (id: number) => {
    const a = accounts.find((x) => x.id === id);
    setForm(a ? { method: a.method, number: a.number } : { method: "Wave", number: "" });
    setFormError("");
    setEditing(id);
  };
  const saveForm = () => {
    if (form.number.replace(/\D/g, "").length < 8) return setFormError("Saisissez un numéro valide.");
    setAccounts(editing ? accounts.map((a) => (a.id === editing ? { ...a, ...form } : a)) : [...accounts, { id: Date.now(), ...form, active: true }]);
    notify(editing ? "Compte modifié" : "Compte ajouté");
    setEditing(null);
  };
  const remove = (id: number) => {
    if (!window.confirm("Supprimer ce compte de retrait ?")) return;
    setAccounts(accounts.filter((a) => a.id !== id));
    notify("Compte supprimé");
  };

  const accountForm = (
    <div className="rounded-card border border-primary/40 bg-primary-light/40 p-4">
      <div className="grid gap-3 sm:grid-cols-[180px_1fr]">
        <div>
          <label htmlFor="acc-method" className="mb-1.5 block text-sm font-semibold text-ink">Opérateur</label>
          <select id="acc-method" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}
            className="w-full rounded-btn border border-line bg-white px-3 py-3 text-base focus:border-primary focus:outline-none sm:text-sm">
            {operators.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="acc-number" className="mb-1.5 block text-sm font-semibold text-ink">Numéro</label>
          <input id="acc-number" type="tel" inputMode="tel" value={form.number} onChange={(e) => { setForm({ ...form, number: e.target.value }); setFormError(""); }} placeholder="+221 77 123 45 67"
            aria-invalid={!!formError} className={`w-full rounded-btn border bg-white px-3 py-3 text-base focus:border-primary focus:outline-none sm:text-sm ${formError ? "border-danger" : "border-line"}`} />
          {formError && <p role="alert" className="mt-1.5 text-sm text-danger">{formError}</p>}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={saveForm} className="inline-flex min-h-11 items-center gap-1.5 rounded-btn bg-primary px-4 text-sm font-bold text-white hover:bg-primary-hover"><Check size={16} /> Enregistrer</button>
        <button onClick={() => setEditing(null)} className="inline-flex min-h-11 items-center gap-1.5 rounded-btn border border-line bg-white px-4 text-sm font-medium text-ink-2 hover:text-ink"><X size={16} /> Annuler</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading mb-3 font-bold text-ink">Comptes de paiement</h3>
        <ul className="space-y-3">
          {accounts.map((a) => editing === a.id ? <li key={a.id}>{accountForm}</li> : (
            <li key={a.id} className="rounded-card flex items-center justify-between gap-3 border border-line bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
                  {a.method.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-ink">{a.method}</p>
                  <p className="text-sm text-ink-2">{a.number}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {a.active && (
                  <span className="rounded-full bg-[#ECF8EF] px-2.5 py-1 text-xs font-bold text-success">Actif</span>
                )}
                <button onClick={() => openForm(a.id)} className="flex size-10 items-center justify-center rounded-lg text-ink-2 hover:bg-page hover:text-ink" title="Modifier" aria-label={`Modifier le compte ${a.method}`}>
                  <Edit2 size={15} />
                </button>
                <button onClick={() => remove(a.id)} className="flex size-10 items-center justify-center rounded-lg text-danger hover:bg-[#FCEDED]" title="Supprimer" aria-label={`Supprimer le compte ${a.method}`}>
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {editing === 0 ? (
          <div className="mt-3">{accountForm}</div>
        ) : (
          <button onClick={() => openForm(0)} className="mt-3 min-h-11 rounded-btn border border-line bg-white px-4 text-sm font-medium text-ink-2 hover:text-ink">
            + Ajouter un compte
          </button>
        )}
      </div>

      <div className="rounded-card border border-line bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-ink">Retrait automatique à 100 000 FCFA</p>
            <p className="text-sm text-ink-2">Déclenche un retrait dès que votre solde atteint ce seuil.</p>
          </div>
          <button
            onClick={() => { setAutoWithdraw(!autoWithdraw); notify(autoWithdraw ? "Retrait automatique désactivé" : "Retrait automatique activé"); }}
            aria-label="Retrait automatique"
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
              autoWithdraw ? "bg-primary" : "bg-line"
            }`}
            role="switch"
            aria-checked={autoWithdraw}
          >
            <span
              className={`inline-block size-5 rounded-full bg-white shadow ring-0 transition-transform ${
                autoWithdraw ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function TabSecurite({ notify }: { notify: Notify }) {
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [sessions, setSessions] = useState([
    { device: "iPhone 14", location: "Dakar, Sénégal", status: "Actif maintenant", active: true },
    { device: "Chrome, Windows", location: "Dakar, Sénégal", status: "Il y a 2 h", active: false },
  ]);

  const changePassword = () => {
    if (!current) return setPwdError("Saisissez votre mot de passe actuel.");
    if (!passwordOk(newPwd)) return setPwdError("Le nouveau mot de passe ne respecte pas encore toutes les règles.");
    if (newPwd !== confirm) return setPwdError("Les deux mots de passe ne sont pas identiques.");
    setPwdError("");
    setCurrent(""); setNewPwd(""); setConfirm("");
    notify("Mot de passe mis à jour");
  };

  const deleteAccount = () => {
    const answer = window.prompt("Cette action est définitive. Tapez SUPPRIMER pour confirmer la suppression de votre compte.");
    if (answer?.trim().toUpperCase() === "SUPPRIMER") window.location.href = "/";
  };

  return (
    <div className="space-y-8">
      {/* Change password */}
      <div>
        <h3 className="font-heading mb-4 font-bold text-ink">Modifier le mot de passe</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="pwd-current" className="mb-1.5 block text-sm font-semibold text-ink">Mot de passe actuel</label>
            <input
              id="pwd-current"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full rounded-btn border border-line bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="pwd-new" className="mb-1.5 block text-sm font-semibold text-ink">Nouveau mot de passe</label>
            <input
              id="pwd-new"
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              className="w-full rounded-btn border border-line bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />
            <Rules value={newPwd} />
          </div>
          <div>
            <label htmlFor="pwd-confirm" className="mb-1.5 block text-sm font-semibold text-ink">Confirmer le mot de passe</label>
            <input
              id="pwd-confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-btn border border-line bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          {pwdError && <p role="alert" className="text-sm text-danger">{pwdError}</p>}
          <button onClick={changePassword} className="min-h-11 rounded-btn bg-primary px-5 font-bold text-white hover:bg-primary-hover">
            Mettre à jour
          </button>
        </div>
      </div>

      {/* Active sessions */}
      <div>
        <h3 className="font-heading mb-4 font-bold text-ink">Sessions actives</h3>
        <ul className="space-y-3">
          {sessions.map((s, i) => (
            <li key={i} className="rounded-card flex items-center justify-between gap-3 border border-line bg-white p-4">
              <div>
                <p className="font-semibold text-ink">{s.device}</p>
                <p className="text-sm text-ink-2">{s.location} — {s.status}</p>
              </div>
              {s.active ? (
                <span className="rounded-full bg-[#ECF8EF] px-2.5 py-1 text-xs font-bold text-success">Actuel</span>
              ) : (
                <button onClick={() => { setSessions(sessions.filter((_, j) => j !== i)); notify("Session déconnectée"); }} className="min-h-10 shrink-0 rounded-btn border border-line bg-white px-3 text-xs font-medium text-ink-2 hover:text-ink">
                  Déconnecter
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Danger zone */}
      <div className="rounded-card border border-danger/30 bg-white p-4 sm:p-6">
        <h3 className="font-heading mb-1 font-bold text-danger">Zone de danger</h3>
        <p className="mb-4 text-sm text-ink-2">Cette action est irréversible. Toutes vos données seront supprimées.</p>
        <button
          onClick={deleteAccount}
          className="min-h-11 rounded-btn border border-danger px-5 text-sm font-bold text-danger hover:bg-[#FCEDED]"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
}

export default function ParametresPage() {
  const [tab, setTab] = useState("profil");
  const [toast, notify] = useToast();

  return (
    <div className="min-h-screen">
      <Sidebar active="Paramètres" />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-6xl space-y-5 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          {/* Header */}
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Paramètres</h1>
            <p className="mt-1 text-sm text-ink-2">Gérez votre compte et vos préférences.</p>
          </div>

          {/* Tabs */}
          <div className="rounded-card border border-line bg-white shadow-soft">
            <div className="flex gap-1 overflow-x-auto border-b border-line px-4 sm:px-6">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  role="tab"
                  aria-selected={tab === t.id}
                  className={`min-h-12 whitespace-nowrap border-b-2 px-4 text-sm font-semibold transition-colors ${
                    tab === t.id
                      ? "border-primary text-primary"
                      : "border-transparent text-ink-2 hover:text-ink"
                  }`}
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
