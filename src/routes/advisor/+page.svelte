<script lang="ts">
  import { getContext } from "svelte";
  import { goto } from "$app/navigation";
  import { Authorizer } from "@authorizerdev/authorizer-svelte";
  import type { AuthToken } from "@authorizerdev/authorizer-js";
  import type { AuthorizerState } from "@authorizerdev/authorizer-svelte/types";

  let auth_state : AuthorizerState;
  const auth_context = getContext("authorizerContext");
  auth_context.subscribe( (data : AuthorizerState) => { auth_state = data } );

  async function authHandler(auth_response : AuthToken) {
    console.log({ auth_response });
    const message = auth_response.message;
    if (message === "Logged in successfully" || message === "Signed up successfully.") {
      goto(`/authenticate?access_token=${auth_response.access_token}&expires_in=${auth_response.expires_in}`);
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
</main>
