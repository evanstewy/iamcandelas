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
  const token = context.env.SENDER_API_TOKEN;

  let email;
  try {
    const body = await context.request.json();
    email = body.email?.trim().toLowerCase();
  } catch {
    return new Response(JSON.stringify({ message: 'Invalid request.' }), {
      status: 400, headers: CORS_HEADERS,
    });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ message: 'Please enter a valid email address.' }), {
      status: 400, headers: CORS_HEADERS,
    });
  }

  if (!token) {
    return new Response(JSON.stringify({ message: 'Server configuration error.' }), {
      status: 500, headers: CORS_HEADERS,
    });
  }

  // Step 1: Create the subscriber
  const subscriberRes = await fetch('https://api.sender.net/v2/subscribers', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!subscriberRes.ok) {
    const data = await subscriberRes.json();
    return new Response(JSON.stringify({ message: data.message || 'Subscription failed.' }), {
      status: 400, headers: CORS_HEADERS,
    });
  }

  // Step 2: Add to "New Subscribers" group
  const groupRes = await fetch('https://api.sender.net/v2/subscribers/groups/bYYJjO', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ subscribers: [email] }),
  });

  const groupData = await groupRes.json();

  // Return full group response so we can see what Sender.net says
  return new Response(JSON.stringify(groupData), {
    status: groupRes.status, headers: CORS_HEADERS,
  });
}
