import { prisma } from "$lib/prisma";
import type { Actions } from "./$types";

export const actions : Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const auth_id = data.get("auth_id");

    const response = await prisma.advisor.upsert({
      where: { auth_id: auth_id },
      update: { name: name },
      create: { name: name, auth_id: auth_id }
    });

    console.log("Action", { response });
    return {...response};
  }
}
