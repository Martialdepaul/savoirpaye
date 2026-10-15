"use client";

import { useState, useId } from "react";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { walletBalance, mobileMoneyProviders, fcfa } from "@/lib/wallet-data";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WithdrawalDrawer({ open, onClose }: Props) {
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState(mobileMoneyProviders[0].id);
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);
  const amountId = useId();
  const providerId = useId();
  const phoneId = useId();

  const selectedProvider = mobileMoneyProviders.find((p) => p.id === provider)!;
  const numAmount = Number(amount.replace(/\s/g, "")) || 0;
  const fees = Math.round(numAmount * selectedProvider.fee);
  const net = numAmount - fees;
  const maxAmount = walletBalance.available;
  const isValid = numAmount >= 5000 && numAmount <= maxAmount && phone.trim().length >= 9;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSuccess(true);
  }

  function handleClose() {
    setSuccess(false);
    setAmount("");
    setPhone("");
    setProvider(mobileMoneyProviders[0].id);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40" onClick={handleClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-xl sm:max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line p-5">
          <h2 className="font-heading text-lg font-extrabold">Demande de retrait</h2>
          <button onClick={handleClose} className="rounded-lg p-1.5 hover:bg-page" aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#f0faf5]">
              <CheckCircle2 size={32} className="text-success" />
            </div>
            <h3 className="font-heading text-xl font-extrabold">Retrait demandé !</h3>
            <p className="text-sm text-ink-2">
              Votre demande de retrait de <span className="num font-bold text-ink">{fcfa(numAmount)}</span> vers{" "}
              <strong>{selectedProvider.label}</strong> a bien été enregistrée. Vous recevrez les fonds sous 24 h.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 w-full rounded-btn bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary-hover"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex-1 space-y-5 px-5 py-5">
              {/* Solde dispo */}
              <div className="rounded-card border border-gold/30 bg-gold-light px-4 py-3">
                <div className="text-xs text-gold-ink/80">Solde disponible</div>
                <div className="num font-heading text-2xl font-extrabold text-gold-ink">{fcfa(maxAmount)}</div>
              </div>

              {/* Montant */}
              <div className="space-y-1.5">
                <label htmlFor={amountId} className="text-sm font-semibold text-ink">Montant à retirer</label>
                <div className="relative">
                  <input
                    id={amountId}
                    type="number"
                    min="5000"
                    max={maxAmount}
                    step="500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ex : 50000"
                    className="w-full rounded-btn border border-line bg-white px-4 py-3 pr-16 text-sm font-medium focus:border-primary focus:outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-2">FCFA</span>
                </div>
                <div className="flex gap-2">
                  {[10000, 25000, 50000, 100000].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAmount(String(v))}
                      className="num rounded-lg border border-line bg-page px-2.5 py-1 text-xs font-semibold text-ink-2 hover:border-primary hover:text-primary"
                    >
                      {v >= 1000 ? `${v / 1000}k` : v}
                    </button>
                  ))}
                </div>
                {numAmount > 0 && numAmount < 5000 && (
                  <p className="text-xs text-danger">Montant minimum : 5 000 FCFA</p>
                )}
                {numAmount > maxAmount && (
                  <p className="text-xs text-danger">Montant supérieur au solde disponible</p>
                )}
              </div>

              {/* Opérateur */}
              <div className="space-y-1.5">
                <label htmlFor={providerId} className="text-sm font-semibold text-ink">Mobile Money</label>
                <select
                  id={providerId}
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full rounded-btn border border-line bg-white px-4 py-3 text-sm font-medium focus:border-primary focus:outline-none"
                >
                  {mobileMoneyProviders.map((p) => (
                    <option key={p.id} value={p.id}>{p.label} — frais {(p.fee * 100).toFixed(1)} %</option>
                  ))}
                </select>
              </div>

              {/* Numéro */}
              <div className="space-y-1.5">
                <label htmlFor={phoneId} className="text-sm font-semibold text-ink">Numéro de téléphone</label>
                <input
                  id={phoneId}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+221 77 000 00 00"
                  className="w-full rounded-btn border border-line bg-white px-4 py-3 text-sm font-medium focus:border-primary focus:outline-none"
                />
              </div>

              {/* Récapitulatif */}
              {numAmount >= 5000 && (
                <div className="rounded-card border border-line bg-page p-4 space-y-2 text-sm">
                  <div className="flex justify-between text-ink-2">
                    <span>Montant demandé</span>
                    <span className="num font-medium">{fcfa(numAmount)}</span>
                  </div>
                  <div className="flex justify-between text-ink-2">
                    <span>Frais {selectedProvider.label} ({(selectedProvider.fee * 100).toFixed(1)} %)</span>
                    <span className="num font-medium text-danger">− {fcfa(fees)}</span>
                  </div>
                  <div className="border-t border-line pt-2 flex justify-between font-bold text-ink">
                    <span>Vous recevez</span>
                    <span className="num text-success">{fcfa(net)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="border-t border-line p-5">
              <button
                type="submit"
                disabled={!isValid}
                className="flex w-full items-center justify-center gap-2 rounded-btn bg-primary py-3 font-bold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirmer le retrait <ArrowUpRight size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
