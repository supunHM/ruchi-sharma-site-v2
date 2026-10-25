/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Sends the enquiry by email through Resend (https://resend.com).
 * Required environment variables (Pages → Settings → Variables and Secrets):
 *   RESEND_API_KEY   secret   API key
 *   CONTACT_TO       text     destination address (defaults to ruchigucci@gmail.com)
 *   CONTACT_FROM     text     verified sender, e.g. "Website <hello@ruchisharma.com>"
 *
 * Without configuration it answers 503 and the on-page form falls back to a
 * pre-filled mailto: link, so nothing is lost.
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

type Ctx = { request: Request; env: Env };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  // Same-origin only.
  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: 'forbidden' }, 403);

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // Honeypot: pretend success so bots move on.
  if (typeof data.website === 'string' && data.website.trim() !== '') return json({ ok: true });

  const name = String(data.name ?? '').trim().slice(0, 120);
  const email = String(data.email ?? '').trim().slice(0, 200);
  const message = String(data.message ?? '').trim().slice(0, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'invalid_input' }, 422);

  if (!env.RESEND_API_KEY) return json({ error: 'not_configured' }, 503);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM ?? 'Website <onboarding@resend.dev>',
      to: [env.CONTACT_TO ?? 'ruchigucci@gmail.com'],
      reply_to: email,
      subject: `New message from ${name.replace(/[\r\n]/g, ' ')}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  });

  return res.ok ? json({ ok: true }) : json({ error: 'send_failed' }, 502);
};

export const onRequest = async (): Promise<Response> => json({ error: 'method_not_allowed' }, 405);
