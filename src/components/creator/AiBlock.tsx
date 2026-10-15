import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export default function AiBlock({ children, className = "", label = true }: { children: ReactNode; className?: string; label?: boolean }) {
  return (
    <div className={`rounded-r-[10px] border-l-[3px] border-ai bg-ai-light p-4 ${className}`}>
      {label && (
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ai">
          <Sparkles size={12} /> Généré par l'IA
        </div>
      )}
      {children}
    </div>
  );
}
