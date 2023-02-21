import { prisma } from "$lib/prisma";
import type { Actions } from "./$types";
import type { Club } from "@prisma/client";

export const actions : Actions = {
  findClub: async ({ request }) => {
    const data = await request.formData();
    const club_name = data.get("club_name");
    const auth_id = data.get("auth_id");

    const response = await prism.club.findUnique({
      where: { name: club_name },
      include: { advisors: true }
    });

    if (response != null) {
      const club = { 
        id: response.id,
        name: response.name,
        secret: response.secret
      } as Club;
      const advisors = response.advisors;
    }

  },
  joinClub: async({ request }) => {

  },
}
