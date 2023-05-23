import { prisma } from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies, params }) {
  const club_slug = params.club;
  const member_id = cookies.get("logged_in");

  console.log({ member_id });
  console.log(cookies.get("access"));

  if (!(member_id && (cookies.get("access") === club_slug))) { 
    throw redirect(308, `/${club_slug}`);
  }

  const club = await prisma.club.findUnique({
    where: { slug: club_slug },
    select: {
      name: true,
      members: true,
      users: true,
      projects: true,
    },
  });

  const member = await prisma.member.findUnique({
    where: { id: parseInt(member_id) },
    select: {
      name: true,
      avatar: true,
      submissions: true,
    }
  });


  return { club, member }
}
