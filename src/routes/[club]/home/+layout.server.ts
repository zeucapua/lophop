export async function load({ locals }) {
  return { club: locals.club, member: locals.member }
}
