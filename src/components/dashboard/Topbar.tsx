import { Bell } from "lucide-react";
import Logo from "../ui/Logo";
import { CreateButton } from "./CreateMenu";
import MobileMenu from "./MobileMenu";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-page/90 px-4 backdrop-blur sm:px-8">
      <div className="lg:hidden"><Logo /></div>
      <div className="hidden lg:block">
        <div className="text-sm text-ink-2">Mercredi 14 octobre 2026</div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <CreateButton />
        <button aria-label="Notifications, 3 non lues" className="relative flex size-10 items-center justify-center rounded-btn border border-line bg-white text-ink-2 hover:text-ink">
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-danger ring-2 ring-white" />
        </button>
        <MobileMenu />
      </div>
    </header>
  );
}
