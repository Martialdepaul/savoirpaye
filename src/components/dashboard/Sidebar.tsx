import Logo from "../ui/Logo";
import { navItems } from "./nav";
import { seller } from "../../lib/dashboard-data";

export default function Sidebar({ active: current = "Accueil" }: { active?: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-line bg-white lg:flex">
      <div className="flex h-16 items-center px-6"><Logo href="/dashboard" /></div>
      <nav className="flex-1 space-y-1 px-3 py-2" aria-label="Navigation du tableau de bord">
        {navItems.map((n) => {
          const active = n.label === current;
          const Icon = n.icon;
          return (
            <a
              key={n.label}
              href={n.href ?? "#"}
              onClick={n.href ? undefined : (e) => e.preventDefault()}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-primary-light text-primary" : "text-ink-2 hover:bg-page hover:text-ink"
              }`}
            >
              <Icon size={18} className={n.ai ? "text-ai" : ""} />
              {n.label}
              {n.ai && <span className="ml-auto rounded-md bg-ai-light px-1.5 py-0.5 text-[11px] font-bold text-ai">IA</span>}
            </a>
          );
        })}
      </nav>
      <div className="border-t border-line p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white">{seller.initials}</span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{seller.name}</div>
            <div className="truncate text-xs text-ink-2">{seller.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
