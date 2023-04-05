import { prisma } from "$lib/prisma";
import { type Handle, redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const auth : Handle = async ({ event, resolve }) => {
  const is_index = event.url.pathname === "/";
  const is_login = event.url.pathname.startsWith("/login");
  const is_dashboard = event.url.pathname.startsWith("/dashboard");
  const is_authenticate = event.url.pathname.startsWith("/authenticate");
  const club_slug = event.params.club;

  if (is_index || is_login || is_dashboard || is_authenticate) {
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
  }

  if (!is_dashboard && club_slug) {
    const club_slug = event.params.club; 
    if (club_slug) {
      const club = await prisma.club.findUnique({
        where: { slug: club_slug },
        select: {
          name: true,
          members: true,
        }
      });
      event.locals.club = club;

      const member_id = event.cookies.get("member_id");
      if (member_id) {
        const member = await prisma.member.findUnique({
          where: { id: parseInt(member_id) },
          select: {
            name: true,
            avatar: true,
            projects: true,
          }
        });

        event.locals.member = member;
      }
    }
  }

  return resolve(event);
};

const routing : Handle = async ({ event, resolve }) => {
  const is_login = event.url.pathname.startsWith("/login");
  const is_authenticate = event.url.pathname.startsWith("/authenticate");
  const is_dashboard = event.url.pathname.startsWith("/dashboard");

  const club_slug = event.params.club;
  const is_club_home = event.url.pathname.startsWith(`/${club_slug}/home`);

  if (is_login) {
    if (event.cookies.get("auth_id")) {
      console.log("login to dashboard");
      throw redirect(308, "/dashboard");
    }
  }


  if (is_authenticate) {
    const auth_id = event.url.searchParams.get("auth_id");
    const access_token = event.url.searchParams.get("access_token");
    const expires_in = event.url.searchParams.get("expires_in");

    if ( !(auth_id && access_token && expires_in) ) {
      console.log("authenticate to login");
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

    console.log("authenticate to dashboard");
    throw redirect(308, "/dashboard");
  }

  if (!is_dashboard && club_slug && !is_club_home) {
    const club_cookie = event.cookies.get(club_slug);
    const member_id = event.cookies.get("member_id");
    if (club_cookie && member_id) { 
      console.log("club slub to home");
      throw redirect(308, `/${club_slug}/home`);
    }
  }

  return resolve(event);
};

export const handle = sequence(routing, auth);
