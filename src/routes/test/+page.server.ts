
export async function load({ url }) {
  const auth_id = url.searchParams("auth_id");
  const access_token = url.searchParams("access_token");
  const expires_in = url.searchParams("expires_in");

  console.log("TEST SERVER LOAD 1:", { auth_id, access_token, expires_in });
}
