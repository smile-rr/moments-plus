export async function onRequest(context) {
    const { env, request } = context;

    const clientId = env.GITHUB_CLIENT_ID;
    const clientSecret = env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return new Response('Missing GitHub OAuth credentials', { status: 500 });
    }

    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return new Response('Missing authorization code', { status: 400 });
    }

    try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            return new Response(`OAuth error: ${tokenData.error_description}`, { status: 400 });
        }

        const accessToken = tokenData.access_token;
        const tokenType = tokenData.token_type || 'bearer';

        // Return HTML that posts the token back to the CMS
        const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authorizing...</title>
</head>
<body>
  <script>
    (function() {
      function receiveMessage(e) {
        console.log("receiveMessage %o", e);
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: accessToken, provider: 'github' })}',
          e.origin
        );
        window.close();
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
</body>
</html>
    `;

        return new Response(html, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
        });
    } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
    }
}
