import type { Formation, Lesson } from "@/lib/student-data";
import { CheckCircle2, PlayCircle, FileText, HelpCircle } from "lucide-react";

interface Props {
  formation: Formation;
  currentId: string;
  completedIds: Set<string>;
  onSelect: (globalIndex: number) => void;
  allLessons: { lesson: Lesson; moduleIndex: number; lessonIndex: number }[];
}

function lessonIcon(type: Lesson["type"], done: boolean, current: boolean) {
  if (done) return <CheckCircle2 size={16} className="shrink-0 text-primary" />;
  if (type === "video") return <PlayCircle size={16} className={`shrink-0 ${current ? "text-primary" : "text-ink-2"}`} />;
  if (type === "text") return <FileText size={16} className={`shrink-0 ${current ? "text-primary" : "text-ink-2"}`} />;
  return <HelpCircle size={16} className={`shrink-0 ${current ? "text-primary" : "text-ink-2"}`} />;
}

export default function CurriculumSidebar({ formation, currentId, completedIds, onSelect, allLessons }: Props) {
  let globalIndex = 0;
  return (
    <div className="py-2">
      {formation.modules.map((mod) => (
        <div key={mod.id}>
          <div className="px-4 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wide text-ink-2">{mod.title}</div>
          {mod.lessons.map((lesson) => {
            const idx = globalIndex++;
            const isCurrent = lesson.id === currentId;
            const isDone = completedIds.has(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => onSelect(idx)}
                className={`flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors ${
                  isCurrent ? "bg-primary-light" : "hover:bg-page"
                }`}
              >
                <span className="mt-0.5">{lessonIcon(lesson.type, isDone, isCurrent)}</span>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm leading-snug ${isCurrent ? "font-semibold text-primary" : isDone ? "text-ink-2 line-through" : "text-ink"}`}>
                    {lesson.title}
                  </div>
                  {lesson.duration && (
                    <div className="mt-0.5 text-[11px] text-ink-2">{lesson.duration}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
