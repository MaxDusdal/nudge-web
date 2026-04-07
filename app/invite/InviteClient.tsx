"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

function NudgeMark() {
  return (
    <Image
      src="/logo.png"
      alt="nudge"
      width={72}
      height={72}
      className="rounded-2xl"
      priority
    />
  );
}

export function InviteClient() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "";

  if (!code) {
    return (
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <NudgeMark />
        <p className="mt-6 text-app-muted text-sm leading-relaxed max-w-[260px]">
          No invite code found. Ask your partner to share their invite link
          again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <NudgeMark />

      <div className="mt-7 mb-1">
        <h1 className="text-[22px] font-bold text-app-text leading-snug">
          You&rsquo;ve been invited!
        </h1>
        <p className="mt-2 text-[15px] text-app-muted leading-relaxed max-w-[260px] mx-auto">
          Your partner wants to connect with you on nudge.
        </p>
      </div>

      <div className="mt-6 w-full rounded-2xl bg-app-primary/10 border border-app-primary/20 py-5 px-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-app-primary/50 mb-2">
          Invite Code
        </p>
        <p
          className="font-mono text-[36px] font-bold text-app-primary"
          style={{ letterSpacing: "0.25em" }}
        >
          {code.toUpperCase()}
        </p>
      </div>

      <a
        href={`nudge://invite?code=${encodeURIComponent(code)}`}
        className="mt-4 block w-full py-[15px] rounded-2xl bg-app-primary text-app-bg text-[17px] font-semibold text-center hover:bg-app-primary-dark active:scale-[0.98] transition-all"
      >
        Open in Nudge
      </a>

      <p className="mt-4 text-xs text-app-muted leading-relaxed">
        Open the Nudge app and enter the code above.
      </p>
    </div>
  );
}
