import type { Formation } from "@/lib/student-data";
import { BookOpen, PlayCircle } from "lucide-react";

export default function FormationCard({ formation: f }: { formation: Formation }) {
  const pct = f.progress;
  return (
    <a
      href={`/dashboard/mes-formations/${f.slug}`}
      className="group flex flex-col rounded-card border border-line bg-white shadow-soft transition-shadow hover:shadow-[0_4px_20px_rgb(28_25_23/0.1)]"
    >
      {/* Cover */}
      <div
        className="flex h-36 items-center justify-center rounded-t-card"
        style={{ backgroundColor: f.cover + "22" }}
      >
        <BookOpen size={40} style={{ color: f.cover }} />
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h2 className="font-heading text-base font-bold leading-snug group-hover:text-primary">{f.title}</h2>
        <p className="text-xs text-ink-2">{f.instructor}</p>

        {/* Progress */}
        <div className="mt-auto space-y-1.5">
          <div className="flex items-center justify-between text-xs text-ink-2">
            <span>{f.completedLessons} / {f.totalLessons} leçons</span>
            <span className="font-semibold">{pct} %</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 pt-1 text-sm font-semibold text-primary">
          <PlayCircle size={16} />
          {pct === 0 ? "Commencer" : pct === 100 ? "Revoir" : "Continuer"}
        </div>
      </div>
    </a>
  );
}
