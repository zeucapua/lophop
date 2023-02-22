import { prisma } from "$lib/prisma";
import type { Actions } from "./$types";
import type { Club } from "@prisma/client";

export const actions : Actions = {
  findClub: async ({ request }) => {
    const data = await request.formData();
    const club_name = data.get("club_name");
    const auth_id = data.get("auth_id");

    const response = await prisma.club.findUnique({
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
      for (const a of advisors) {
        if (a.auth_id === auth_id) { return { status: "already in" } }
      }
      return { club_name, status: "found", club: club, advisors: advisors }
    }
    else {
      return { club_name, status: "not found" }
    }

  },
  joinClub: async({ request }) => {
    const data = await request.formData();
    const club_name = data.get("club_name");
    const auth_id = data.get("auth_id");
    const secret = data.get("secret");
    const status = data.get("status");

    if (status === "found") {
      const response = await prisma.club.findUnique({
        where: { name: club_name },                                     
        include: { advisors: true }
      });
      if (response && response.secret === secret) {
        const response = await prisma.club.update({
          where: { name: club_name },
          data: {
            advisors: { connect: { auth_id } }
          }
        });
        return { status: "success" }
      }
      else { return { status: "fail" } }
    }
    else {
      const response = await prisma.advisor.update({
        where: { auth_id: auth_id },
        data: { clubs: { create: { name: club_name, secret: secret } } }
      });
      return { status: "success" }
    }
  },
}
