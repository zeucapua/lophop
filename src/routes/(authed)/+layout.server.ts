import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  const auth_id = cookies.get("auth_id");
  const access_token = cookies.get("access_token");

  if ( !(auth_id && access_token) ) {
    throw redirect(308, "/login");
  }
}

