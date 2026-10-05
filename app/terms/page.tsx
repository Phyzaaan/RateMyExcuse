import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Rate My Excuse",
};

export default function TermsPage() {
  return (
    <main className="w-full flex justify-center min-h-screen px-4 py-8 text-slate-100">
      <div className=" flex max-w-3xl h-fit flex-col gap-6 rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Rate My Excuse
          </p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Terms of Service
          </h1>
        </div>

        <div className="flex flex-col gap-6 text-sm leading-7 text-slate-200 md:text-base">
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">1. Acceptance</h2>
            <p>
              By using Rate My Excuse, you agree to these terms. If you do not agree,
              please do not use the service.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">2. Service Use</h2>
            <p>
              This service is provided for entertainment and general use. We do not
              guarantee accuracy, fairness, or legal advice in any verdict or response.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">3. User Content</h2>
            <p>
              You are responsible for the content you submit. Do not share harmful,
              abusive, illegal, or offensive material.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">4. Availability</h2>
            <p>
              We may update, pause, or discontinue the service at any time without prior
              notice.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">5. Limitation</h2>
            <p>
              We are not liable for any indirect, incidental, or consequential damages
              arising from use of the service.
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
