import { Minus, Plus } from "lucide-react";
import { durations, languages, levels, styles } from "../../lib/course-data";

export type Settings = {
  level: (typeof levels)[number];
  language: string;
  audience: string;
  duration: string;
  modules: number;
  style: string;
  goal: string;
};

const field = "mt-2 w-full rounded-btn border border-line bg-white px-3.5 py-3 text-[15px] outline-none focus:border-ai focus:ring-2 focus:ring-ai/20";
const labelCls = "text-sm font-semibold";

export default function StepSettings({ value, onChange }: { value: Settings; onChange: (s: Settings) => void }) {
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-soft sm:p-7">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <div className={labelCls} id="lvl">Niveau</div>
          <div role="radiogroup" aria-labelledby="lvl" className="mt-2 flex rounded-btn border border-line bg-page p-1">
            {levels.map((l) => (
              <button
                key={l}
                role="radio"
                aria-checked={value.level === l}
                onClick={() => set("level", l)}
                className={`flex-1 rounded-lg px-2 py-2.5 text-sm font-medium transition-colors ${value.level === l ? "bg-ai text-white" : "text-ink-2 hover:text-ink"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="lang" className={labelCls}>Langue</label>
          <select id="lang" className={field} value={value.language} onChange={(e) => set("language", e.target.value)}>
            {languages.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="aud" className={labelCls}>Public cible</label>
          <input id="aud" className={field} value={value.audience} onChange={(e) => set("audience", e.target.value)} placeholder="Ex. : commerçantes et entrepreneurs" />
        </div>
        <div>
          <label htmlFor="dur" className={labelCls}>Durée totale</label>
          <select id="dur" className={field} value={value.duration} onChange={(e) => set("duration", e.target.value)}>
            {durations.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <div className={labelCls} id="mods">Nombre de modules</div>
          <div className="mt-2 flex items-center gap-3" role="group" aria-labelledby="mods">
            <button onClick={() => set("modules", Math.max(3, value.modules - 1))} aria-label="Moins de modules" className="flex size-11 items-center justify-center rounded-btn border border-line hover:bg-ai-light"><Minus size={16} /></button>
            <span className="num w-10 text-center font-heading text-xl font-bold">{value.modules}</span>
            <button onClick={() => set("modules", Math.min(6, value.modules + 1))} aria-label="Plus de modules" className="flex size-11 items-center justify-center rounded-btn border border-line hover:bg-ai-light"><Plus size={16} /></button>
            <span className="text-xs text-ink-2">entre 3 et 6</span>
          </div>
        </div>
        <div>
          <label htmlFor="style" className={labelCls}>Style pédagogique</label>
          <select id="style" className={field} value={value.style} onChange={(e) => set("style", e.target.value)}>
            {styles.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="goal" className={labelCls}>Objectif de la formation</label>
          <textarea id="goal" rows={3} className={`${field} resize-none`} value={value.goal} onChange={(e) => set("goal", e.target.value)} placeholder="Ce que vos élèves sauront faire à la fin" />
        </div>
      </div>
    </div>
  );
}
