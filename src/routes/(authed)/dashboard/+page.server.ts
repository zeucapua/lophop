import { prisma } from "$lib/prisma";
import { error, fail, redirect } from "@sveltejs/kit";
import slugify from "@sindresorhus/slugify";
import type { Actions } from "@sveltejs/kit";
import type { Advisor, Club } from "@prisma/client";

export async function load({ cookies }) {
  const auth_id = cookies.get("auth_id");

  const response = await prisma.advisor.findUnique({
    where: { auth_id: auth_id, },
    include: { clubs: true }
  });

  if (!response) {
    const response = await prisma.advisor.create({
      data: { auth_id: auth_id }
    });

    const a = {
      id: response.id,
      name: response.name,
      auth_id: auth_id
    } as Advisor;

    return { advisor: a, clubs: [] }
  }

  const a = {
    id: response.id,
    name: response.name,
    auth_id: auth_id
  } as Advisor;


  return { advisor: a, clubs: response.clubs }
}

export const actions : Actions = {
  logout: async ({cookies}) => {
    cookies.delete("auth_id");
    cookies.delete("access_token");

    await prisma.$disconnect();
    throw redirect(303, "/");
  },
  deleteClub: async ({ cookies, request }) => {
    const data = await request.formData();
    const club_slug = data.get("club_slug") as string;
    const auth_id = cookies.get("auth_id");

    let existing_club = await prisma.club.findUnique({
      where: { slug: club_slug },
      include: { advisors: true }
    });
    if (!existing_club) { throw error(500, "Internal Error"); }

    const existing_advisors = existing_club.advisors;
    if (existing_advisors.length > 1) {
      await prisma.advisor.update({
        where: { auth_id: auth_id },
        data: { 
          clubs: { disconnect: { slug: club_slug } }
        }
      });
    }
    else { 
      await prisma.club.delete({ where: { slug: club_slug } });
    }
  }
}
