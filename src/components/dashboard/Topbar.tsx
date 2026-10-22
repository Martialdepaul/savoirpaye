import Logo from "../ui/Logo";
import { CreateButton } from "./CreateMenu";
import MobileMenu from "./MobileMenu";
import Notifications from "./Notifications";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-page/90 px-4 backdrop-blur sm:px-8">
      <div className="lg:hidden"><Logo href="/dashboard" /></div>
      <div className="hidden lg:block">
        <div className="text-sm text-ink-2">Mercredi 14 octobre 2026</div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <CreateButton />
        <Notifications />
        <MobileMenu />
      </div>
    </header>
  );
}
