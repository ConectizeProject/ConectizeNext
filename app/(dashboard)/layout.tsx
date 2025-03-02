import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-56">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </>
  );
}
