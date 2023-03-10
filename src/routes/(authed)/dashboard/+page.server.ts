import { prisma } from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import slugify from "@sindresorhus/slugify";
import type { Actions } from "@sveltejs/kit";
import type { Advisor, Club } from "@prisma/client";

export async function load({ cookies }) {
  const auth_id = cookies.get("auth_id");
  console.log("DASHBOARD", { auth_id });

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
    throw redirect(303, "/");
  },
  findClub: async ({ cookies, request }) => {
    const data = await request.formData();
    const club_name = slugify(data.get("club_name"));
    const auth_id = cookies.get("auth_id");

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
  createClub: async ({ params, request }) => {
    const data = await request.formData();
    const secret = data.get("secret");
  },
}
