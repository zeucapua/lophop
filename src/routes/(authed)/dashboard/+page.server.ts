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
  deleteClub: async ({ request }) => {
    const data = await request.formData();
    const club_name = data.get("club_name");

    await prisma.club.delete({ where: { name: club_name } });
  }
}
