import { prisma } from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import slugify from "@sindresorhus/slugify";
import { onMount } from "svelte";

export const actions : Actions = {
  findClub: async ({ cookies, request }) => {
    const data = await request.formData();
    const club_name = data.get("club_name") as string;
    const auth_id = cookies.get("auth_id");

    let club_slug = slugify(club_name); 
    let response = await prisma.club.findUnique({
      where: { slug: club_slug },
      include: { advisors: true }
    });

    if (response) {
      let slug_variation = club_slug + Math.floor(Math.random() * 999);
      let valid = false;
      do {
        let response = await prisma.club.findUnique({
          where: { slug: slug_variation }
        });
        valid = !response;
      } while (!valid);

      const existing_advisors = response.advisors;
      for (const a of existing_advisors) {
        if (a.auth_id === auth_id) { 
          return { club_name, club_slug, slug_variation, status: "presently", advisors: existing_advisors }
        }
      }

      return { club_name, club_slug, slug_variation, status: "found", advisors: existing_advisors }; 
    }
    
    return { club_name, club_slug, status: "available" }
  },
  joinClub: async ({ cookies, request }) => {
    const data = await request.formData();
    const club_name = data.get("club_name") as string;
    const club_slug = data.get("club_slug") as string;
    const slug_variation = data.get("slug_variation") as string;
    const final_slug = data.get("final_slug") as string;

    const auth_id = cookies.get("auth_id") as string;
    const status = data.get("status") as string;

    const secret = data.get("secret") as string;
    const confirm_secret = data.get("secret2") as string;
    
    if (secret != confirm_secret) {
      return fail(400, { club_name, club_slug, slug_variation, final_slug, status, unmatched: true }); 
    }

  },
  createClub: async ({ cookies, request }) => {
    const data = await request.formData();
    const club_name = data.get("club_name") as string;
    const club_slug = data.get("club_slug") as string;

    const auth_id = cookies.get("auth_id") as string;
    const status = data.get("status") as string;

    const secret = data.get("secret") as string;
    const confirm_secret = data.get("secret2") as string;

    await prisma.club.create({
      data: {
        name: club_name,
        slug: club_slug,
        secret: secret,
        advisors: { connect: { auth_id } }
      }
    });
  },
}
