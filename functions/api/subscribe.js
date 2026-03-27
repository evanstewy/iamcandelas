/**
 * Netlify Edge Function: /api/subscribe
 *
 * Proxies newsletter subscription requests to Sender.net API.
 * The API token is stored as a Netlify environment variable (SENDER_API_TOKEN),
 * so it is NEVER exposed to the browser.
 *
 * Deploy steps:
 *  1. Push this site to a GitHub repo
 *  2. Connect repo to Netlify (app.netlify.com → Add new site)
 *  3. Go to Site settings → Environment variables → Add:
 *       Key:   SENDER_API_TOKEN
 *       Value: <your Sender.net API token>
 *  4. Deploy — this function auto-activates at /api/subscribe
 */

export default async (request, context) => {
  // Only allow POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // CORS headers — restrict to your domain in production
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Parse request body
  let email;
  try {
    const body = await request.json();
    email = body.email?.trim().toLowerCase();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid request body" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ message: "Please enter a valid email address." }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  // Get token from environment variable (set in Netlify dashboard)
  const token = Deno.env.get("SENDER_API_TOKEN");
  if (!token) {
    console.error("SENDER_API_TOKEN environment variable not set");
    return new Response(JSON.stringify({ message: "Server configuration error." }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  // Call Sender.net API
  try {
    const senderResponse = await fetch("https://api.sender.net/v2/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email,
        // Optional: add groups array if you want to assign to a specific list
        // groups: ["YOUR_GROUP_ID"],
      }),
    });

    const data = await senderResponse.json();

    // Sender.net returns 200/201 on success
    if (senderResponse.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Sender.net error — relay a safe message
    console.error("Sender.net API error:", senderResponse.status, data);
    const message = data?.message || data?.error || "Subscription failed. Please try again.";
    return new Response(JSON.stringify({ message }), {
      status: 400,
      headers: corsHeaders,
    });

  } catch (err) {
    console.error("Network error calling Sender.net:", err);
    return new Response(JSON.stringify({ message: "Network error. Please try again." }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const config = { path: "/api/subscribe" };
