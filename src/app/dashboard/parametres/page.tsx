"use client";

import { useState } from "react";
import { Copy, Trash2, Edit2 } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";

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

function TabProfil() {
  const [prenom, setPrenom] = useState("Aminata");
  const [nom, setNom] = useState("Diallo");
  const [email, setEmail] = useState("aminata@savoirpaye.com");
  const [phone, setPhone] = useState("+221 77 000 00 00");
  const [bio, setBio] = useState("Formatrice spécialisée en bureautique et e-commerce à Dakar.");

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-2xl font-bold text-white">
          AD
        </span>
        <div>
          <p className="font-semibold text-ink">Photo de profil</p>
          <button className="mt-1 rounded-btn border border-line bg-white px-4 py-2 text-sm font-medium text-ink-2 hover:text-ink">
            Modifier la photo
          </button>
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
        <button className="rounded-btn bg-primary px-5 py-2.5 font-bold text-white hover:bg-primary-hover">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}

function TabBoutique() {
  const [nomBoutique, setNomBoutique] = useState("SavoirPay Academy");
  const [desc, setDesc] = useState("Formez-vous aux compétences numériques essentielles pour réussir en Afrique.");
  const [categorie, setCategorie] = useState("Bureautique");
  const url = "savoirpaye.com/boutique/aminata-diallo";

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
            onClick={() => navigator.clipboard.writeText(`https://${url}`)}
            className="rounded-btn border border-line bg-white px-3 py-3 text-ink-2 hover:text-ink"
            title="Copier l'URL"
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
        <button className="rounded-btn bg-primary px-5 py-2.5 font-bold text-white hover:bg-primary-hover">
          Enregistrer
        </button>
      </div>
    </div>
  );
}

function TabPaiements() {
  const [autoWithdraw, setAutoWithdraw] = useState(false);

  const accounts = [
    { method: "Wave", number: "+221 77 000 00 00", active: true },
    { method: "Orange Money", number: "+221 76 000 00 00", active: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading mb-3 font-bold text-ink">Comptes de paiement</h3>
        <ul className="space-y-3">
          {accounts.map((a) => (
            <li key={a.method} className="rounded-card flex items-center justify-between gap-3 border border-line bg-white p-4">
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
                <button onClick={() => {}} className="rounded p-1.5 text-ink-2 hover:bg-page hover:text-ink" title="Modifier">
                  <Edit2 size={15} />
                </button>
                <button onClick={() => {}} className="rounded p-1.5 text-danger hover:bg-[#FCEDED]" title="Supprimer">
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-3 rounded-btn border border-line bg-white px-4 py-2 text-sm font-medium text-ink-2 hover:text-ink">
          + Ajouter un compte
        </button>
      </div>

      <div className="rounded-card border border-line bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-ink">Retrait automatique à 100 000 FCFA</p>
            <p className="text-sm text-ink-2">Déclenche un retrait dès que votre solde atteint ce seuil.</p>
          </div>
          <button
            onClick={() => setAutoWithdraw(!autoWithdraw)}
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

function PasswordStrength({ password }: { password: string }) {
  const strength = Math.min(4, Math.floor(password.length / 3));
  const colors = ["bg-danger", "bg-pending", "bg-pending", "bg-success"];
  return (
    <div className="mt-2 flex gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors ${i < strength ? colors[strength - 1] : "bg-line"}`}
        />
      ))}
    </div>
  );
}

function TabSecurite() {
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");

  const sessions = [
    { device: "iPhone 14", location: "Dakar, Sénégal", status: "Actif maintenant", active: true },
    { device: "Chrome, Windows", location: "Dakar, Sénégal", status: "Il y a 2 h", active: false },
  ];

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
            <PasswordStrength password={newPwd} />
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
          <button className="rounded-btn bg-primary px-5 py-2.5 font-bold text-white hover:bg-primary-hover">
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
                <button onClick={() => {}} className="rounded-btn border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-2 hover:text-ink">
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
          onClick={() => {}}
          className="rounded-btn border border-danger px-5 py-2.5 text-sm font-bold text-danger hover:bg-[#FCEDED]"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
}

export default function ParametresPage() {
  const [tab, setTab] = useState("profil");

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
                  className={`whitespace-nowrap border-b-2 px-4 pb-3 pt-3 text-sm font-semibold transition-colors ${
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
              {tab === "profil" && <TabProfil />}
              {tab === "boutique" && <TabBoutique />}
              {tab === "paiements" && <TabPaiements />}
              {tab === "securite" && <TabSecurite />}
            </div>
          </div>
        </main>
      </div>
      <BottomNav active="Paramètres" />
    </div>
  );
}
