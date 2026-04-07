import type { Metadata } from "next";
import { Suspense } from "react";
import { InviteClient } from "./InviteClient";

export const metadata: Metadata = {
  title: "You've been invited to nudge",
  description: "Accept your invite and connect with your partner on nudge.",
};

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[380px] bg-white rounded-3xl px-8 py-10 shadow-[0_4px_40px_rgba(44,62,91,0.10)]">
        {children}
      </div>
    </main>
  );
}

function LoadingFallback() {
  return <div className="py-10" />;
}

export default function InvitePage() {
  return (
    <CardShell>
      <Suspense fallback={<LoadingFallback />}>
        <InviteClient />
      </Suspense>
    </CardShell>
  );
}
