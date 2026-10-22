import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  text,
  children,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <section className="bg-forest-glow text-white">
      <div className={`mx-auto max-w-6xl px-4 py-14 sm:px-5 lg:py-20 ${center ? "text-center" : ""}`}>
        {eyebrow && (
          <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85">{eyebrow}</span>
        )}
        <h1 className={`mt-5 font-heading text-[34px] font-extrabold leading-[1.1] sm:text-5xl lg:text-[56px] ${center ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>
          {title}
        </h1>
        {text && <p className={`mt-5 text-lg leading-relaxed text-white/80 ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{text}</p>}
        {children}
      </div>
    </section>
  );
}
