import { redirect } from "@sveltejs/kit";

export async function load({ cookies, url }) {
  const auth_id = cookies.get("auth_id");
  const access_token = cookies.get("access_token");

  if (auth_id && access_token) { 
    throw redirect(308, "/dashboard");
  }
  else {
    const auth_id = url.searchParams.get("auth_id");
    const access_token = url.searchParams.get("access_token");
    const expires_in = url.searchParams.get("expires_in");

    if ( !(auth_id && access_token && expires_in) ) {
      throw redirect(308, "/login");
    }


    cookies.set("auth_id", auth_id, {
      path: "/",
      maxAge: parseInt(expires_in),
    });
    
    cookies.set("access_token", access_token, {
      path: "/",
      maxAge: parseInt(expires_in),
    });

    throw redirect(308, "/dashboard");
  }
}
