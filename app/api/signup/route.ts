export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, recaptchaToken } = body as {
    email?: unknown;
    recaptchaToken?: unknown;
  };

  // Validate email
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Verify reCAPTCHA v3
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) {
    console.error("RECAPTCHA_SECRET_KEY is not set");
    return Response.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  if (typeof recaptchaToken !== "string" || !recaptchaToken) {
    return Response.json({ error: "Missing reCAPTCHA token" }, { status: 400 });
  }

  const verifyRes = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      body: new URLSearchParams({
        secret: recaptchaSecret,
        response: recaptchaToken,
      }),
    }
  );
  const verifyData = (await verifyRes.json()) as {
    success: boolean;
    score?: number;
    action?: string;
  };

  if (!verifyData.success || (verifyData.score ?? 1) < 0.5) {
    return Response.json(
      { error: "reCAPTCHA verification failed" },
      { status: 400 }
    );
  }

  // Insert into Supabase (server-only credentials, never sent to browser)
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase env vars are not set");
    return Response.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const insertRes = await fetch(`${supabaseUrl}/rest/v1/email_signups`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      source: "landing_page",
    }),
  });

  if (insertRes.status === 201) {
    return Response.json({ success: true }, { status: 201 });
  }

  if (insertRes.status === 409) {
    return Response.json({ duplicate: true }, { status: 409 });
  }

  const insertData = await insertRes.json().catch(() => null);
  if ((insertData as { code?: string } | null)?.code === "23505") {
    return Response.json({ duplicate: true }, { status: 409 });
  }

  console.error("Supabase insert failed", insertRes.status, insertData);
  return Response.json({ error: "Failed to save signup" }, { status: 500 });
}
