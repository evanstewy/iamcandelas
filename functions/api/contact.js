const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const token = context.env.RESEND_API_KEY;

  if (!token) {
    return new Response(JSON.stringify({ message: 'Server configuration error.' }), {
      status: 500, headers: CORS_HEADERS,
    });
  }

  let name, email, message;
  try {
    const body = await context.request.json();
    name    = body.name?.trim();
    email   = body.email?.trim().toLowerCase();
    message = body.message?.trim();
  } catch {
    return new Response(JSON.stringify({ message: 'Invalid request.' }), {
      status: 400, headers: CORS_HEADERS,
    });
  }

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ message: 'All fields are required.' }), {
      status: 400, headers: CORS_HEADERS,
    });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Candelas Website <contact@iamcandelas.com>',  // ← change to your verified domain
      to:   ['davidalfonso.candelas@gmail.com'],                            // ← change to where you want to receive messages
      replyTo: `${name} <${email}>`,
      subject: `New message from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }),
  });

  const data = await res.json();
  return res.ok
    ? new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS_HEADERS })
    : new Response(JSON.stringify({ message: data.message || 'Failed to send message.' }), { status: 400, headers: CORS_HEADERS });
}