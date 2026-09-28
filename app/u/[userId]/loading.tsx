export default function Loading() {
	return (
		<main className="relative w-full flex flex-col items-center justify-center gap-6 py-8 px-4">
      <section className="relative w-full max-w-5xl mx-auto glass-panel rounded-xl py-6 px-4 shadow-sm animate-pulse">
        <div className="flex items-center gap-6 pb-4">
          <div className="w-28 h-28 rounded-full bg-black/10 border-2 border-black/10" />

          <div className="flex-1">
            <div className="h-8 bg-black/25 rounded w-48" />

            <div className="flex items-center gap-3 py-2">
              <div className="h-6 w-24 bg-black/25 rounded" />
              <div className="h-4 w-32 bg-black/25 rounded" />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-black/10 rounded-lg text-center">
              <div className="pb-2">
              <div className="h-10 bg-black/20 rounded w-16 mx-auto" />
              </div>
              <div className="h-3 bg-black/20 rounded w-24 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    </main>
	);
}

