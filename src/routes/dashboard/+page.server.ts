import slugify from "@sindresorhus/slugify";
import { prisma } from "$lib/prisma";
import { error, redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const session = await locals.getSession();
  if (!session) {
    throw redirect(308, "/");
  }

  const user_data = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      clubs: true
    }
  });

  if (!user_data) { throw error(500, "Cannot find User data") }

  const { clubs, ...user } = user_data;
  return { user, clubs };
}

export const actions = {
  findClub: async ({ locals, request }) => {
    const session = await locals.getSession();
    const user_id = session.user.id;

    const club_name = await request.formData().then((f) => f.get("club_name"));
    const slug = slugify(club_name);

    const existing_club = await prisma.club.findUnique({
      where: { slug },
      include: { users: true }
    });

    if (existing_club) {
      let slug_variation : string;
      let valid = false;
      do {
        slug_variation = slug + Math.floor(Math.random() * 999);
        let response = await prisma.club.findUnique({
          where: { slug: slug_variation }
        });
        valid = !response;
      } while (!valid);

      for (const user of existing_club.users) {
        if (user.id === user_id) {
          return {
            club_name, slug, slug_variation, status: "present",
            users: existing_club.users
          }
        }
      }

      return { 
        club_name, slug, slug_variation, status: "found",
        users: existing_club.users
      }
    }

    return { club_name, slug, status: "available" };
  },

  createClub: async ({ locals, request }) => {
    const data = await request.formData();
    const club_name = data.get("club_name") as string;
    const slug = data.get("slug") as string;
    const slug_variation = data.get("slug_variation") as string;
    const final_slug = data.get("final_slug") as string;

    const status = data.get("status");
    const secret = data.get("secret");
    const confirm_secret = data.get("confirm_secret");

    const session = await locals.getSession();
    const user_id = session.user.id;

    if (secret != confirm_secret) {
      return {
        club_name, slug, slug_variation, final_slug, status, unmatched: true 
      }
    }

    await prisma.club.create({
      data: {
        name: club_name,
        slug: final_slug,
        secret,
        users: { connect: { id: user_id }}
      }
    });

    throw redirect(308, "/dashboard")
  },

  joinClub: async ({ locals, request }) => {

  },

  deleteClub: async ({ request }) => {
    const club_slug = await request.formData().then((f) => f.get("slug"));

    await prisma.club.delete({ where: { slug: club_slug }});
  }
}
