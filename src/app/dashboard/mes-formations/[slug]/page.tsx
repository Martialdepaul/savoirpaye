"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { formations, getAllLessons, type Lesson } from "@/lib/student-data";
import CurriculumSidebar from "@/components/student/CurriculumSidebar";
import LessonContent from "@/components/student/LessonContent";
import { ChevronLeft, ChevronRight, Menu, X, CheckCircle2, GraduationCap } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function CoursePlayerPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const formation = formations.find((f) => f.slug === slug);
  if (!formation) return notFound();

  const allLessons = useMemo(() => getAllLessons(formation), [formation]);
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Start at the first incomplete lesson
    const idx = allLessons.findIndex((l) => !l.lesson.completed);
    return idx === -1 ? 0 : idx;
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [completedSet, setCompletedSet] = useState<Set<string>>(() =>
    new Set(allLessons.filter((l) => l.lesson.completed).map((l) => l.lesson.id))
  );

  const currentLesson = allLessons[currentIndex].lesson;
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  function markDone() {
    setCompletedSet((s) => new Set([...s, currentLesson.id]));
    if (next) setCurrentIndex(currentIndex + 1);
  }

  const doneCount = completedSet.size;
  const totalCount = allLessons.length;
  const progressPct = Math.round((doneCount / totalCount) * 100);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-page">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-white px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <a href="/dashboard/mes-formations" className="-ml-2 flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-ink-2 hover:text-ink">
            <ChevronLeft size={18} /> Mes formations
          </a>
        </div>
        <div className="hidden lg:block"><Logo /></div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-xs text-ink-2 sm:flex">
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="num font-medium">{progressPct} %</span>
          </div>
          <button
            className="flex items-center gap-1.5 rounded-btn border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink-2 hover:text-ink lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Ouvrir le curriculum"
          >
            <Menu size={17} /> Sommaire
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Curriculum sidebar — desktop */}
        <aside className="hidden w-80 shrink-0 overflow-y-auto border-r border-line bg-white lg:flex lg:flex-col">
          <div className="border-b border-line p-4">
            <h2 className="font-heading text-sm font-bold">{formation.title}</h2>
            <p className="mt-1 text-xs text-ink-2">{doneCount} / {totalCount} leçons terminées</p>
          </div>
          <CurriculumSidebar
            formation={formation}
            currentId={currentLesson.id}
            completedIds={completedSet}
            onSelect={(idx) => setCurrentIndex(idx)}
            allLessons={allLessons}
          />
        </aside>

        {/* Curriculum drawer — mobile */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
            <div className="absolute inset-y-0 right-0 flex w-80 max-w-full flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-line p-4">
                <div>
                  <h2 className="font-heading text-sm font-bold">{formation.title}</h2>
                  <p className="mt-0.5 text-xs text-ink-2">{doneCount} / {totalCount} leçons terminées</p>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="rounded-lg p-1.5 hover:bg-page" aria-label="Fermer"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <CurriculumSidebar
                  formation={formation}
                  currentId={currentLesson.id}
                  completedIds={completedSet}
                  onSelect={(idx) => { setCurrentIndex(idx); setDrawerOpen(false); }}
                  allLessons={allLessons}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-8">
            <LessonContent lesson={currentLesson} completedIds={completedSet} />

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Previous */}
              <button
                onClick={() => prev && setCurrentIndex(currentIndex - 1)}
                disabled={!prev}
                className="flex items-center gap-2 rounded-btn border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} /> Leçon précédente
              </button>

              {/* Mark done / next */}
              {!completedSet.has(currentLesson.id) ? (
                <button
                  onClick={markDone}
                  className="flex items-center gap-2 rounded-btn bg-primary px-6 py-2.5 font-bold text-white transition-colors hover:bg-primary-hover"
                >
                  <CheckCircle2 size={18} /> Marquer comme terminée
                </button>
              ) : next ? (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="flex items-center gap-2 rounded-btn bg-primary px-6 py-2.5 font-bold text-white transition-colors hover:bg-primary-hover"
                >
                  Leçon suivante <ChevronRight size={17} />
                </button>
              ) : (
                <div className="flex items-center gap-2 rounded-btn bg-primary-light px-6 py-2.5 font-bold text-primary">
                  <GraduationCap size={18} /> Formation terminée !
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
