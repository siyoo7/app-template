import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { Webhook } from 'svix';
import { internal } from './_generated/api';

const http = httpRouter();

http.route({
  path: '/clerk-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) return new Response('Missing webhook secret', { status: 500 });

    const headers = {
      'svix-id': request.headers.get('svix-id') ?? '',
      'svix-timestamp': request.headers.get('svix-timestamp') ?? '',
      'svix-signature': request.headers.get('svix-signature') ?? '',
    };
    const body = await request.text();

    let event: any;
    try {
      event = new Webhook(secret).verify(body, headers);
    } catch {
      return new Response('Invalid signature', { status: 400 });
    }

    if (event.type === 'user.created' || event.type === 'user.updated') {
      await ctx.runMutation(internal.users.syncUser, {
        clerkUserId: event.data.id,
        email: event.data.email_addresses[0]?.email_address ?? '',
        firstName: event.data.first_name ?? undefined,
        lastName: event.data.last_name ?? undefined,
      });
    }

    return new Response('ok', { status: 200 });
  }),
});

export default http;
