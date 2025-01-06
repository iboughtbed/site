import { ClientPage } from "./page.client";

export default function CraftPage() {
  return (
    <main className="relative mx-auto my-0 flex min-h-screen flex-col overflow-hidden pb-1 pl-1 pt-2">
      <div className="craft-grid ml-[-8px] flex w-auto pl-1 pr-2">
        <ClientPage />
      </div>
    </main>
  );
}
