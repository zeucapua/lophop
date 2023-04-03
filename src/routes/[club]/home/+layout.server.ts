import { prisma } from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies, params }) {
  const club_slug = params.club;
  const member_id = cookies.get("logged_in");
  const club_cookie = cookies.get(club_slug);

  if (!(member_id && club_cookie)) { 
    throw redirect(308, `/${club_slug}`);
  }

  const club = await prisma.club.findUnique({
    where: { slug: club_slug },
    select: {
      name: true,
      members: {
        select: { name: true, avatar: true, projects: true }
      },
      advisors: {
        select: { name: true }
      }
    }
  });

  const member = await prisma.member.findUnique({
    where: { id: parseInt(member_id) },
    select: {
      name: true,
      avatar: true,
      projects: true,
    }
  });

  return { club, member }
}
