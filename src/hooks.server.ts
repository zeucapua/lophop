import { prisma } from "$lib/prisma";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";

import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const auth = (async (...args) => {
  const [{ event }] = args;
  return SvelteKitAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
      GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET }),
    ],
    callbacks: {
      async session({ user, session }) {
        session.user = {
          id: user.id,
          name: user.name,
          image: user.image,
        };

        event.locals.session = session;
        return session;
      }
    }
  })(...args);
}) satisfies Handle;


export const handle = sequence(auth);
