import { prisma } from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export async function load({ cookies }) {
  const auth_id = cookies.get("auth_id");
  console.log("DASHBOARD", { auth_id });

  const advisor = await prisma.advisor.findUnique({
    where: { auth_id: auth_id, },
  });

  if (!advisor) {
    const newAdvisor = await prisma.advisor.create({
      data: { auth_id: auth_id }
    });

    return { advisor: newAdvisor }
  }

  return { advisor }
}

export const actions : Actions = {
  default: async ({cookies}) => {
    cookies.delete("auth_id");
    cookies.delete("access_token");
    throw redirect(303, "/");
  },
}
