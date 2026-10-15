"use client";

import type { Lesson } from "@/lib/student-data";
import { PlayCircle, FileText } from "lucide-react";
import QuizBlock from "./QuizBlock";

interface Props {
  lesson: Lesson;
  completedIds: Set<string>;
}

export default function LessonContent({ lesson, completedIds }: Props) {
  return (
    <article>
      {/* Lesson header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
          {lesson.type === "video" && <PlayCircle size={20} />}
          {lesson.type === "text" && <FileText size={20} />}
          {lesson.type === "quiz" && <span className="text-base font-extrabold">?</span>}
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-ink-2">
            {lesson.type === "video" ? "Vidéo" : lesson.type === "text" ? "Lecture" : "Quiz"}
            {lesson.duration && ` · ${lesson.duration}`}
          </div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">{lesson.title}</h1>
        </div>
      </div>

      {/* Video */}
      {lesson.type === "video" && (
        <div className="overflow-hidden rounded-card bg-ink aspect-video flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-white/60">
            <PlayCircle size={56} className="text-white/40" />
            <span className="text-sm">Lecture vidéo disponible dans la version complète</span>
          </div>
        </div>
      )}

      {/* Text */}
      {lesson.type === "text" && lesson.content && (
        <div className="prose-custom rounded-card border border-line bg-white p-6 sm:p-8">
          <SimpleMarkdown content={lesson.content} />
        </div>
      )}

      {/* Quiz */}
      {lesson.type === "quiz" && lesson.quiz && (
        <QuizBlock questions={lesson.quiz} lessonId={lesson.id} alreadyDone={completedIds.has(lesson.id)} />
      )}
    </article>
  );
}

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="font-heading mb-3 mt-6 text-lg font-bold first:mt-0">{line.slice(3)}</h2>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={i} className="mb-2 font-semibold">{line.slice(2, -2)}</p>);
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="my-3 overflow-x-auto rounded-lg bg-page p-4 font-mono text-sm text-ink">
          {codeLines.join("\n")}
        </pre>
      );
    } else if (line.startsWith("- ")) {
      elements.push(<li key={i} className="ml-4 list-disc text-ink-2">{line.slice(2)}</li>);
    } else if (line.trim()) {
      elements.push(<p key={i} className="mb-3 text-ink-2 leading-relaxed">{line}</p>);
    }
    i++;
  }
  return <div>{elements}</div>;
}
