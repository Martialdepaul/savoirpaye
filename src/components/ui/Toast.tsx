"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

/** Petit message de confirmation temporaire : const [toast, show] = useToast(); show("Enregistré") */
export function useToast(duration = 2800) {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = useCallback((m: string) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), duration);
  }, [duration]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const node = (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4 lg:bottom-8">
      {msg && (
        <div className="floatin-fast flex items-center gap-2 rounded-btn bg-ink px-4 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgb(28_25_23/0.25)]">
          <CheckCircle2 size={17} className="shrink-0 text-[#6ee7b7]" /> {msg}
        </div>
      )}
    </div>
  );

  return [node, show] as const;
}
