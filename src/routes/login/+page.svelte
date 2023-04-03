<script lang="ts">
  import { getContext } from "svelte";
  import { goto } from "$app/navigation";
  import { Authorizer } from "@authorizerdev/authorizer-svelte";
  import type { AuthorizerState } from "@authorizerdev/authorizer-svelte/types";

  let auth_state : AuthorizerState;
  const auth_context = getContext("authorizerContext");
  auth_context.subscribe( (data : AuthorizerState) => { auth_state = data } );

  async function authHandler(authResponse) {
    const message = authResponse.message;
    if (message === "Logged in successfully" || message === "Signed up successfully.") {
      const auth_id = authResponse.user.id;
      const access_token = authResponse.access_token;
      const expires_in = authResponse.expires_in;

      await auth_state.logout();
      console.log("LOGIN", { auth_id, access_token, expires_in });
      goto(`/redirect/?auth_id=${auth_id}&access_token=${access_token}&expires_in=${expires_in}`);
    }
  }

</script>

<main class="flex flex-col gap-8 w-full min-w-screen justify-center items-center p-8">
  <h1 class="text-6xl font-quicksand">Club Advisor Login</h1>
  <section class="w-full max-w-xl border-4 p-12">
    <Authorizer 
      onLogin={(loginResponse) => authHandler(loginResponse)}
      onSignup={(signupResponse) => authHandler(signupResponse)}
    />
  </section>
  <button>Login as a student</button>
</main>
