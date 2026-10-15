import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomNav from "./BottomNav";

export default function DashboardShell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar active={active} />
      <div className="lg:pl-64">
        <Topbar />
        {children}
      </div>
      <BottomNav active={active} />
    </div>
  );
}
