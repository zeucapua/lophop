import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";


export const actions = {
  register: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const password = data.get("password");
    const club_slug = data.get("club_slug");

    const avatar = Math.floor(Math.random() * 50) + 1;

    await prisma.member.create({
      data: { 
        name,
        password,
        avatar,
        Club: {
          connect: { slug: club_slug }
        }
      },
    });
  },
  deleteMember: async ({ request }) => {
    const data = await request.formData();
    const member_id = parseInt(data.get("id"));
    await prisma.member.update({
      where: { id: member_id },
      data: { projects: { deleteMany: {} } },
    });
    await prisma.member.delete({ where: { id: member_id } });
  }
}
