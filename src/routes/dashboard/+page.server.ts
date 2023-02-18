import { prisma } from "$lib/prisma";
import { current_advisor } from "$lib/stores";
import type { PageServerLoad } from "./$types";

export async function load() : PageServerLoad {
  const advisor = await prisma.advisor.findUnique({
    where: { auth_id: $current_advisor },
    include: { clubs: true }
  });
  return { advisor: advisor };
}
