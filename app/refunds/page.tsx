import Link from "next/link";

export const metadata = {
  title: "Refund Policy | Rate My Excuse",
};

export default function RefundPage() {
  return (
    <main className="w-full flex justify-center min-h-screen px-4 py-8 text-slate-100">
      <div className="flex max-w-3xl h-fit flex-col gap-6 rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Rate My Excuse
          </p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Refund Policy
          </h1>
        </div>

        <div className="flex flex-col gap-6 text-sm leading-7 text-slate-200 md:text-base">
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">Current Policy</h2>
            <p>
              We do not currently offer a refund system for purchases or subscriptions.
              This is a simple placeholder page while we plan the feature later.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">Coming Soon</h2>
            <p>
              A formal refund process will be introduced in the future. Until then,
              purchases are considered final unless otherwise stated by our team.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">If You Need Help</h2>
            <p>
              If there is a serious issue with access or a service problem, please contact
              us and we will review the matter manually.
            </p>
          </section>
        </div>

        <div className="flex border-t border-white/10 pt-4 text-sm text-slate-300">
          <Link href="/" className="text-cyan-300 underline underline-offset-4">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
