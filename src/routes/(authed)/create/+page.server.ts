import { prisma } from "$lib/prisma";
import slugify from "@sindresorhus/slugify";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const actions : Actions = {
  findClub: async ({ cookies, request }) => {
    const data = await request.formData();
    const club_input = data.get("club_name") as string;
    const auth_id = cookies.get("auth_id");

    const club_name = slugify(club_input);

    const response = await prisma.club.findUnique({
      where: { name: club_name },
      include: { advisors: true }
    });

    if (response) {
      const exisiting_advisors = response.advisors;
      for (const a of exisiting_advisors) {
        if (a.auth_id === auth_id) { return { status: "presently" }; }
      }
      return { club_name, status: "found", advisors: exisiting_advisors}; 
    }
    return { club_name, status: "available" }
  },
  joinClub: async ({ cookies, request }) => {
    const data = await request.formData();
    const club_input = data.get("club_name") as string;
    const auth_id = cookies.get("auth_id") as string;
    const status = data.get("status") as string ;
    const secret = data.get("secret") as string;
    const secret2 = data.get("secret2") as string;

    const club_name = slugify(club_input);

    if (secret != secret2) {
      return fail(400, { club_name, status, unmatching: true });
    }


    if (status === "found") {
      const response = await prisma.club.findUnique({
        where: { name: club_name }
      });
      if (response && response.secret === secret) {
        const response = await prisma.club.update({
          where: { name: club_name },
          data: {
            advisors: { connect: { auth_id } }
          }
        });
        throw redirect(303, "/dashboard");
      }
      else {
        return { status: "fail" }
      }
    }

    const response = await prisma.club.create({
      data: {
        name: club_name,
        secret: secret,
        advisors: { connect: { auth_id } }
      }
    });

    throw redirect(303, "/dashboard");

  }
}
