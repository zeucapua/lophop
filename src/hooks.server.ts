import { prisma } from "$lib/prisma";
import { type Handle, redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const auth : Handle = async ({ event, resolve }) => {
  const auth_id = event.cookies.get("auth_id");
  if (auth_id) {
    let advisor = await prisma.advisor.findUnique({
      where: { auth_id: auth_id },
      include: { clubs: true }
    });

    if (!advisor) {
      advisor = await prisma.advisor.create({
        data: { auth_id, clubs: {create: []} },
        include: { clubs: true }
      });
    }
    event.locals.advisor = advisor;
  }

  return resolve(event);
};

const routing : Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/login")) {
    if (event.cookies.get("auth_id")) {
      throw redirect(308, "/dashboard");
    }
  }


  if (event.url.pathname.startsWith("/authenticate")) {
    const auth_id = event.url.searchParams.get("auth_id");
    const access_token = event.url.searchParams.get("access_token");
    const expires_in = event.url.searchParams.get("expires_in");

    if ( !(auth_id && access_token && expires_in) ) {
      throw redirect(307, "/login");
    }


    event.cookies.set("auth_id", auth_id, {
      path: "/",
      maxAge: parseInt(expires_in),
    });
    
    event.cookies.set("access_token", access_token, {
      path: "/",
      maxAge: parseInt(expires_in),
    });

    throw redirect(308, "/dashboard");
  }

  return resolve(event);
};

export const handle = sequence(routing, auth);
