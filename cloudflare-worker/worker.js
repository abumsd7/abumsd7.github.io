/**
 * Cloudflare Worker: Fast, Privacy-Friendly Page View Counter
 * Backed by Cloudflare KV namespace (Binding name: POST_VIEWS)
 *
 * Routes:
 * - GET /api/views?id=<path>          -> Returns view count without incrementing
 * - GET /api/views?id=<path>&inc=1    -> Increments view count and returns new total
 * - POST /api/views?id=<path>         -> Increments view count and returns new total
 * - GET /api/total                    -> Returns global total views across all pages
 * - GET /health                       -> Healthcheck endpoint
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Dynamic CORS Headers allowing requests from your blog
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Healthcheck
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', time: new Date().toISOString() }), {
        status: 200,
        headers: corsHeaders
      });
    }

    // KV Binding Verification
    if (!env.POST_VIEWS) {
      return new Response(
        JSON.stringify({
          error: 'KV namespace POST_VIEWS is not bound to this Worker.',
          help: 'In Cloudflare Dashboard -> Workers -> Settings -> Variables -> KV Namespace Bindings -> Variable: POST_VIEWS'
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Global Total Endpoint
    if (url.pathname === '/api/total') {
      try {
        let globalTotal = await env.POST_VIEWS.get('__global_total__');
        return new Response(
          JSON.stringify({ totalViews: globalTotal ? parseInt(globalTotal, 10) : 0 }),
          { status: 200, headers: corsHeaders }
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // Page-specific endpoint
    const rawId = url.searchParams.get('id') || url.searchParams.get('path');

    if (!rawId) {
      return new Response(
        JSON.stringify({ error: 'Missing required query parameter "id" (e.g. ?id=/gtamodding/2026/08/11/post/)' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Normalize path key (strip query, lower-case, remove trailing slashes)
    let cleanKey = rawId.trim().split('?')[0].split('#')[0];
    cleanKey = cleanKey.replace(/\/+$/, '') || '/';

    const shouldIncrement = request.method === 'POST' || url.searchParams.get('inc') === '1';

    try {
      let currentVal = await env.POST_VIEWS.get(cleanKey);
      let count = currentVal ? parseInt(currentVal, 10) : 0;
      if (isNaN(count)) count = 0;

      if (shouldIncrement) {
        count += 1;
        // Non-blocking asynchronous KV write
        ctx.waitUntil(env.POST_VIEWS.put(cleanKey, count.toString()));

        // Also update global total in background
        ctx.waitUntil((async () => {
          try {
            let g = await env.POST_VIEWS.get('__global_total__');
            let gCount = g ? parseInt(g, 10) : 0;
            await env.POST_VIEWS.put('__global_total__', (gCount + 1).toString());
          } catch (e) {}
        })());
      }

      return new Response(
        JSON.stringify({
          id: cleanKey,
          views: count,
          incremented: shouldIncrement
        }),
        { status: 200, headers: corsHeaders }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'KV Operation Failed', details: err.message }),
        { status: 500, headers: corsHeaders }
      );
    }
  }
};
