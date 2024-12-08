import { ClientPage } from "./page.client";

export default function CraftPage() {
  return (
    <main className="relative mx-auto my-0 flex min-h-screen flex-col overflow-hidden pb-1 pl-1 pt-2">
      {/* <div className="craft-grid ml-[-8px] grid grid-cols-1 pl-1 pr-2 min-[480px]:grid-cols-2 min-[960px]:grid-cols-3">
        {crafts.map((craft, index) => (
          <div
            key={index}
            className={cn(
              "col-span-1 break-before-avoid pl-2",
              index % 3 === 0
                ? "sm:col-start-1 md:col-start-1"
                : index % 3 === 1
                  ? "sm:col-start-2 md:col-start-2"
                  : "sm:col-start-1 md:col-start-3",
            )}
          >
            <CraftCard craft={craft} />
          </div>
        ))}
      </div> */}

      <div className="craft-grid ml-[-8px] flex w-auto pl-1 pr-2">
        <ClientPage />
      </div>
    </main>
  );
}
