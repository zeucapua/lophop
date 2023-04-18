import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export async function authenticate({ event, resolve }) : Handle {
  let access_token = event.cookies.get("access_token") || null;
  if (event.url.pathname.startsWith("/authenticate")) {
    access_token = event.url.searchParams.get("access_token");
    const expires_in = parseInt(event.url.searchParams.get("expires_in"));
    event.cookies.set("access_token", access_token, {
      path: "/",
      maxAge: expires_in,
    });

    throw redirect(308, "/advisor/dashboard");
  }
  else if (event.url.pathname === ("/advisor")) {
    if (access_token) { 
      console.log("advisor auth", { access_token });
      throw redirect(307, "/dashboard"); 
    }
  }
  else if (event.url.pathname.startsWith("/advisor/dashboard")) {
    if (!access_token) { 
      console.log("dashboard auth", { access_token });
      throw redirect(307, "/advisor"); 
    }
  }

  return resolve(event);
}

export const handle = sequence(authenticate);
