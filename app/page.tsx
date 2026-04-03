import SignupForm from "./components/SignupForm";

function IconPair() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="text-app-primary">
      <circle cx="10" cy="9" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M3 22c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="9" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M18 22c0-2.485 1.343-4.662 3.333-5.832" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="text-app-primary">
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2" />
      <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="text-app-primary">
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2" />
      <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 20.5l1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="text-app-primary">
      <rect x="3" y="5" width="22" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M3 11h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 3v4M19 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 17l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const features = [
  {
    icon: <IconPair />,
    heading: "Pair with someone you trust",
    body: "Connect with a friend, sibling, or partner using a simple invite code. Accountability works best with someone who actually cares.",
  },
  {
    icon: <IconTarget />,
    heading: "Set real screen time goals",
    body: "Choose daily app limits that mean something — no more doomscrolling for hours. Your goals, your rules.",
  },
  {
    icon: <IconClock />,
    heading: "Ask before going over",
    body: "Hit your limit? Send your partner a request for more time. They approve or deny it. That one moment of friction is often all it takes.",
  },
  {
    icon: <IconCalendar />,
    heading: "Weekly honest check-ins",
    body: "Every week, rate how your partner did and leave a short note. Real feedback from someone who cares keeps both of you moving forward.",
  },
];

function PhonePlaceholder({ label }: { label: string }) {
  return (
    <div className="screenshot-placeholder relative w-[220px] flex-shrink-0 aspect-[9/19] rounded-[2.5rem] border-2 border-dashed border-app-primary/30 bg-app-primary/5 flex items-center justify-center text-xs text-app-primary/50 text-center px-4 leading-relaxed">
      {label}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section id="hero" className="mx-auto w-full max-w-6xl px-8 pt-24 pb-20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10">

            {/* Left: content */}
            <div className="flex-1 min-w-0">
              <p className="text-5xl font-bold tracking-tight text-app-primary sm:text-6xl">
                nudge
              </p>
              <h1 className="mt-4 text-2xl font-semibold leading-snug text-app-text sm:text-3xl max-w-md">
                Better screen time habits,{" "}
                <span className="text-app-primary">together.</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-app-muted max-w-sm">
                nudge pairs you with someone you trust to build healthier phone
                habits — not through willpower alone, but through real human
                accountability.
              </p>

              <div className="mt-8 max-w-sm">
                <SignupForm formId="hero" />
                <p className="mt-3 text-sm text-app-muted">
                  We&apos;ll only email you when nudge launches. No spam.
                </p>
              </div>

              {/* App Store badge placeholder */}
              {/* TODO: Replace with real App Store badge when available */}
              {/* <a href="https://apps.apple.com/..." target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                <img src="/app-store-badge.svg" alt="Download on the App Store" width="156" height="52" />
              </a> */}
            </div>

            {/* Right: screenshot */}
            <div className="flex lg:justify-end">
              <PhonePlaceholder label="Screenshot coming soon" />
            </div>

          </div>
        </section>

        {/* ── How it works ──────────────────────────────────── */}
        <section className="border-t border-app-text/10 bg-white/50">
          <div className="mx-auto w-full max-w-6xl px-8 py-20">
            <div className="flex flex-col lg:flex-row lg:items-start gap-10">

              {/* Left: features */}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-semibold text-app-text sm:text-3xl">
                  How it works
                </h2>
                <p className="mt-3 text-app-muted max-w-sm">
                  Your phone habits, with a buddy. No lectures, no
                  detox — just a little friendly accountability.
                </p>

                <div className="mt-10 space-y-8">
                  {features.map((f) => (
                    <div key={f.heading} className="flex gap-4">
                      <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-app-primary/10 flex items-center justify-center">
                        {f.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-app-text">{f.heading}</h3>
                        <p className="mt-1 text-app-muted leading-relaxed text-sm max-w-xs">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: screenshot */}
              <div className="flex lg:justify-end lg:sticky lg:top-10">
                <PhonePlaceholder label="App screenshots coming soon" />
              </div>

            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-6xl px-8 py-20">
          <div className="max-w-lg">
            <h2 className="text-2xl font-semibold text-app-text sm:text-3xl">
              Be the first to know when nudge launches.
            </h2>
            <p className="mt-3 text-app-muted">
              Sign up and we&apos;ll reach out the moment it&apos;s ready.
            </p>
            <div className="mt-8 max-w-sm">
              <SignupForm formId="cta" />
              <p className="mt-3 text-sm text-app-muted">
                We&apos;ll only email you when nudge launches. No spam.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-app-text/10 mt-auto">
        <div className="mx-auto w-full max-w-6xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-app-muted">
          <p>© 2026 nudge</p>
          <nav className="flex gap-6">
            <a href="/privacy" className="hover:text-app-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-app-primary transition-colors">
              Terms of Service
            </a>
            <a href="mailto:hello@nudgeapp.co" className="hover:text-app-primary transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
