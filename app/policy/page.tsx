import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Rate My Excuse",
};

export default function PolicyPage() {
  return (
    <main className="w-full flex justify-center min-h-screen px-4 py-8 text-slate-100">
      <div className=" flex max-w-3xl h-fit flex-col gap-6 rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Rate My Excuse
          </p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Privacy Policy
          </h1>
        </div>

        <div className="flex flex-col gap-6 text-sm leading-7 text-slate-200 md:text-base">
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
            <p>
              We may collect basic account details, usage information, and content you
              choose to submit to the platform.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">2. How We Use It</h2>
            <p>
              We use this information to provide, improve, and secure the service,
              personalize your experience, and manage community features.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">3. Cookies and Analytics</h2>
            <p>
              We may use cookies or similar tools to understand usage patterns and improve
              performance.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">4. Third Parties</h2>
            <p>
              Some services may be provided by trusted third parties for hosting,
              analytics, or payment processing.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">5. Your Choices</h2>
            <p>
              You can choose not to share certain information, but some features may not
              work correctly without it.
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
