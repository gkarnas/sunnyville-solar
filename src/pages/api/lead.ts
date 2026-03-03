import type { APIRoute } from 'astro';
import Twilio from 'twilio';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  const { name, phone, address, preferredInstallTime } = data;

  const client = Twilio(
    import.meta.env.TWILIO_ACCOUNT_SID,
    import.meta.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    body: `
New Lead:
Name: ${name}
Phone: ${phone}
Address: ${address}
Install: ${preferredInstallTime}
    `,
    from: import.meta.env.TWILIO_PHONE_NUMBER,
    to: import.meta.env.MY_PHONE_NUMBER
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};