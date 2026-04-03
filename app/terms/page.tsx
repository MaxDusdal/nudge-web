import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — nudge",
  description: "Terms of Service for nudge.",
};

export default function TermsPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-6 py-20 flex-1">
        <Link
          href="/"
          className="text-sm text-app-primary hover:underline inline-block mb-10"
        >
          ← Back to nudge
        </Link>

        <h1 className="text-4xl font-bold text-app-primary mb-2">nudge</h1>
        <h2 className="text-2xl font-semibold text-app-text mb-8">
          Terms of Service
        </h2>

        <div className="prose prose-sm max-w-none text-app-muted leading-relaxed space-y-4">
          <p>
            <strong className="text-app-text">Last updated:</strong> This policy
            will be updated before nudge launches.
          </p>
          <p>
            These Terms of Service govern your use of the nudge iOS app and
            related services provided by nudge (&quot;we&quot;, &quot;us&quot;,
            or &quot;our&quot;).
          </p>
          <p>
            This is a placeholder document. The full Terms of Service will be
            published here before the app is available to download.
          </p>
          <p>
            For questions in the meantime, contact us at{" "}
            <a
              href="mailto:hello@nudgeapp.co"
              className="text-app-primary hover:underline"
            >
              hello@nudgeapp.co
            </a>
            .
          </p>
        </div>
      </main>

      <footer className="border-t border-app-text/10 mt-auto">
        <div className="mx-auto w-full max-w-3xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-app-muted">
          <p>© 2026 nudge</p>
          <nav className="flex gap-6">
            <Link href="/privacy" className="hover:text-app-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-app-primary transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
