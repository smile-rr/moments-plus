export async function onRequest(context) {
    const { env, request } = context;

    const clientId = env.GITHUB_CLIENT_ID;

    if (!clientId) {
        return new Response('Missing GITHUB_CLIENT_ID environment variable', { status: 500 });
    }

    // Get the origin from the request
    const url = new URL(request.url);
    const origin = url.origin;

    // GitHub OAuth authorization URL
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', `${origin}/api/callback`);
    authUrl.searchParams.set('scope', 'repo,user');
    authUrl.searchParams.set('state', crypto.randomUUID());

    return Response.redirect(authUrl.toString(), 302);
}
