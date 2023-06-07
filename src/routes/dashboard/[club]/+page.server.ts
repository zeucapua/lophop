import { prisma } from "$lib/prisma";

export const actions = {
  createMember: async ({ params, request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const club_slug = params.club;

    const avatar = Math.floor(Math.random() * 50) + 1;

    await prisma.member.create({
      data: { 
        name,
        avatar,
        club: {
          connect: { slug: club_slug }
        }
      },
    });
  },

  deleteMember: async ({ params, request }) => {
    const data = await request.formData();
    const member_id = parseInt(data.get("id"));
    const club_slug = params.club;

    await prisma.club.update({
      where: { slug: club_slug },
      data: {
        members: {
          update: {
            where: { id: member_id },
            data: { submissions: { deleteMany: {} }}
          }
        }
      }
    });

    await prisma.club.update({
      where: { slug: club_slug },
      data: {
        members: {
          delete: { id: member_id }
        }
      }
    });
  },

  createProject: async ({ params, request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const club_slug = params.club;

    await prisma.project.create({
      data: {
        title,
        club: {
          connect: { slug: club_slug }
        }
      }
    });
  }
}
