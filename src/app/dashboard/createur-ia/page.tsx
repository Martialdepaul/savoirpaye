"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Sparkles, PartyPopper } from "lucide-react";
import DashboardShell from "../../../components/dashboard/DashboardShell";
import StepStart from "../../../components/creator/StepStart";
import StepSettings, { type Settings } from "../../../components/creator/StepSettings";
import StepGeneration from "../../../components/creator/StepGeneration";
import StepReview, { toReviewItems } from "../../../components/creator/StepReview";
import { buildCourse, courseTitle } from "../../../lib/course-data";

const steps = [
  { title: "Point de départ", sub: "Votre idée ou vos documents" },
  { title: "Paramètres", sub: "Public, durée et style" },
  { title: "Génération", sub: "L'IA rédige le programme" },
  { title: "Relecture", sub: "Validez chaque élément" },
];

export default function CreateurIaPage() {
  const [step, setStep] = useState(0);
  const [idea, setIdea] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [settings, setSettings] = useState<Settings>({
    level: "Débutant",
    language: "Français",
    audience: "Commerçants et entrepreneurs qui débutent sur WhatsApp",
    duration: "4 heures",
    modules: 6,
    style: "Pratique, avec exercices",
    goal: "Obtenir ses premières ventes régulières grâce à WhatsApp Business.",
  });
  const [generated, setGenerated] = useState(false);
  const [review, setReview] = useState<ReturnType<typeof toReviewItems>>([]);
  const [created, setCreated] = useState(false);

  const course = useMemo(() => buildCourse(settings.modules), [settings.modules]);
  const onDone = useCallback(() => setGenerated(true), []);

  const canStart = idea.trim().length >= 5 || files.length > 0;
  const title = idea.trim() && idea.trim().length < 80 ? idea.trim() : courseTitle;
  const pct = created ? 100 : ((step + (step === 2 && generated ? 1 : 0.5)) / steps.length) * 100;

  const go = (n: number) => { setStep(n); window.scrollTo({ top: 0 }); };
  const startGeneration = () => { setGenerated(false); go(2); };
  const toReview = () => { setReview(toReviewItems(course)); go(3); };

  return (
    <DashboardShell active="Créateur IA">
      <main className="mx-auto max-w-4xl px-4 pb-48 pt-6 sm:px-8 lg:pb-32">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-btn bg-ai-light text-ai"><Sparkles size={20} /></span>
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Créateur de formation IA</h1>
            <p className="text-sm text-ink-2">Votre programme complet en quelques minutes.</p>
          </div>
        </div>

        <div className="mt-6" aria-label={`Étape ${step + 1} sur 4`}>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="num font-semibold text-ai">Étape {created ? 4 : step + 1} sur 4</span>
            <span className="hidden text-ink-2 sm:inline">{steps[created ? 3 : step].sub}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-ai transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <ol className="mt-3 grid grid-cols-4 gap-2">
            {steps.map((s, i) => {
              const done = i < step || created;
              const current = i === step && !created;
              return (
                <li key={s.title} className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className={`num flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${done ? "bg-ai text-white" : current ? "border-2 border-ai text-ai" : "border border-line text-ink-2"}`}>
                    {done ? <Check size={13} /> : i + 1}
                  </span>
                  <span className={`hidden sm:inline ${current ? "font-semibold" : "text-ink-2"}`}>{s.title}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <h2 className="mb-4 mt-8 font-heading text-xl font-bold">{created ? "Formation créée" : steps[step].title}</h2>

        {created ? (
          <div className="rounded-card border border-line bg-white p-8 text-center shadow-soft">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-light text-primary"><PartyPopper size={26} /></span>
            <h3 className="mt-4 font-heading text-xl font-bold">« {title} » est enregistrée en brouillon</h3>
            <p className="num mx-auto mt-2 max-w-md text-ink-2">{review.filter((r) => r.accepted).length} éléments validés. Vous pouvez la compléter, l'illustrer et fixer son prix avant de la publier.</p>
            <Link href="/dashboard" className="mt-6 inline-flex rounded-btn bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover">Retour à l'accueil</Link>
          </div>
        ) : (
          <>
            {step === 0 && <StepStart idea={idea} setIdea={setIdea} files={files} setFiles={setFiles} />}
            {step === 1 && <StepSettings value={settings} onChange={setSettings} />}
            {step === 2 && <StepGeneration items={course} onDone={onDone} />}
            {step === 3 && <StepReview title={title} items={review} setItems={setReview} onCreate={() => setCreated(true)} />}

            {step < 3 && (
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                {step > 0 ? (
                  <button onClick={() => go(step - 1)} className="inline-flex items-center justify-center gap-2 rounded-btn border border-line bg-white px-5 py-3 font-semibold hover:bg-page">
                    <ArrowLeft size={17} /> Retour
                  </button>
                ) : <span />}
                {step === 0 && (
                  <button disabled={!canStart} onClick={() => go(1)} className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-2">
                    Continuer <ArrowRight size={17} />
                  </button>
                )}
                {step === 1 && (
                  <button onClick={startGeneration} className="inline-flex items-center justify-center gap-2 rounded-btn bg-ai px-6 py-3 font-semibold text-white hover:opacity-90">
                    <Sparkles size={17} /> Générer le programme
                  </button>
                )}
                {step === 2 && (
                  <button disabled={!generated} onClick={toReview} className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-2">
                    Relire le programme <ArrowRight size={17} />
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-[76px] z-40 border-t border-line bg-white/95 backdrop-blur lg:bottom-0 lg:left-64">
        <p className="mx-auto flex max-w-4xl items-center justify-center gap-2 px-4 py-3 text-sm text-ink-2">
          <ShieldCheck size={16} className="shrink-0 text-success" /> Rien n'est publié sans votre validation.
        </p>
      </div>
    </DashboardShell>
  );
}
