"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/student-data";
import { CheckCircle2, XCircle, ChevronRight, Trophy } from "lucide-react";

interface Props {
  questions: QuizQuestion[];
  lessonId: string;
  alreadyDone?: boolean;
}

type Answer = { selected: number; correct: boolean };

export default function QuizBlock({ questions, alreadyDone }: Props) {
  const [step, setStep] = useState(0); // current question index
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [done, setDone] = useState(alreadyDone ?? false);

  const q = questions[step];
  const score = answers.filter((a) => a.correct).length;

  function confirm() {
    if (selected === null) return;
    setConfirmed(true);
    setAnswers((prev) => [...prev, { selected, correct: selected === q.correct }]);
  }

  function next() {
    if (step < questions.length - 1) {
      setStep(step + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setDone(true);
    }
  }

  if (done) {
    const finalScore = answers.length > 0 ? answers.filter((a) => a.correct).length : score;
    const total = questions.length;
    const pct = Math.round((finalScore / total) * 100);
    return (
      <div className="rounded-card border border-line bg-white p-6 text-center sm:p-8">
        <Trophy size={40} className="mx-auto text-gold" />
        <h2 className="font-heading mt-4 text-2xl font-extrabold">Quiz terminé !</h2>
        <p className="mt-2 text-ink-2">Vous avez obtenu</p>
        <div className="num mt-3 font-heading text-5xl font-extrabold text-primary">{finalScore} / {total}</div>
        <div className="num mt-1 text-lg font-semibold text-ink-2">{pct} %</div>
        <div className={`mt-3 text-sm font-medium ${pct >= 70 ? "text-success" : "text-pending"}`}>
          {pct >= 70 ? "Excellent travail ! Vous pouvez passer à la suite." : "Relisez la leçon et réessayez pour consolider vos acquis."}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-line bg-white p-5 sm:p-8">
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between text-xs text-ink-2">
        <span>Question {step + 1} sur {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-all ${
                i < step
                  ? answers[i]?.correct
                    ? "bg-success"
                    : "bg-danger"
                  : i === step
                  ? "bg-primary"
                  : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h3 className="font-heading mb-5 text-lg font-bold leading-snug">{q.question}</h3>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let cls = "flex items-center gap-3 w-full rounded-card border-2 p-4 text-left text-sm font-medium transition-all cursor-pointer";
          if (!confirmed) {
            cls += selected === idx
              ? " border-primary bg-primary-light text-primary"
              : " border-line bg-white hover:border-primary/40 hover:bg-primary-light/50 text-ink";
          } else {
            if (idx === q.correct) cls += " border-success bg-[#f0faf5] text-success";
            else if (idx === selected && idx !== q.correct) cls += " border-danger bg-[#fef2f2] text-danger";
            else cls += " border-line bg-white text-ink-2";
          }
          return (
            <button
              key={idx}
              className={cls}
              onClick={() => !confirmed && setSelected(idx)}
              disabled={confirmed}
            >
              {confirmed && idx === q.correct && <CheckCircle2 size={18} className="shrink-0 text-success" />}
              {confirmed && idx === selected && idx !== q.correct && <XCircle size={18} className="shrink-0 text-danger" />}
              {(!confirmed || (idx !== q.correct && idx !== selected)) && (
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
              )}
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation (after confirmation) */}
      {confirmed && (
        <div className={`mt-4 rounded-lg p-4 text-sm ${answers.at(-1)?.correct ? "bg-[#f0faf5] text-success" : "bg-[#fef2f2] text-danger"}`}>
          <div className="flex items-start gap-2">
            {answers.at(-1)?.correct ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <XCircle size={16} className="mt-0.5 shrink-0" />}
            <div>
              <div className="font-semibold">{answers.at(-1)?.correct ? "Bonne réponse !" : "Mauvaise réponse"}</div>
              <div className="mt-0.5 text-ink-2">{q.explanation}</div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex justify-end">
        {!confirmed ? (
          <button
            onClick={confirm}
            disabled={selected === null}
            className="rounded-btn bg-primary px-6 py-2.5 font-bold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={next}
            className="flex items-center gap-2 rounded-btn bg-primary px-6 py-2.5 font-bold text-white transition-colors hover:bg-primary-hover"
          >
            {step < questions.length - 1 ? "Question suivante" : "Voir le résultat"}
            <ChevronRight size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
