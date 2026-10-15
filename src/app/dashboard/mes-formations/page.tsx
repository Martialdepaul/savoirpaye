"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import FormationCard from "@/components/student/FormationCard";
import { formations } from "@/lib/student-data";

export default function MesFormationsPage() {
  return (
    <div className="min-h-screen">
      <Sidebar active="Formations" />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-5xl space-y-6 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Mes formations</h1>
            <p className="mt-1 text-sm text-ink-2">Continuez là où vous vous êtes arrêté.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {formations.map((f) => (
              <FormationCard key={f.slug} formation={f} />
            ))}
          </div>
        </main>
      </div>
      <BottomNav active="Formations" />
    </div>
  );
}
