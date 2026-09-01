import Link from "next/link";

function getErrorMessage(params?: Record<string, string | string[] | undefined>) {
  const rawMessage = params?.message ?? params?.error;

  if (Array.isArray(rawMessage)) {
    return rawMessage[0] ?? "Something went wrong.";
  }

  return rawMessage ?? "Something went wrong while trying to sign you in.";
}

export default async function ErrorPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const message = getErrorMessage(params);

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-8 shadow-lg">
        <div className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
          Authentication error
        </div>

        <h1 className="pb-4 text-3xl font-bold tracking-tight text-primary md:text-5xl">
          {message}
        </h1>

        <div className="rounded-2xl border border-card-border bg-primary-bg/60 p-4 text-sm text-tertiary">
          This usually happens when the sign-in link has expired, the OAuth flow
          was interrupted, or the callback could not complete.
        </div>

        <div className="pt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl bg-primary-color px-4 py-3 font-semibold text-white transition hover:opacity-95"
          >
            Try again
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-card-border bg-primary-bg px-4 py-3 font-semibold text-primary transition hover:bg-card-bg-hover"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
