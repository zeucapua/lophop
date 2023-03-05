<script lang="ts">
  import { getContext } from "svelte";
  import { goto } from "$app/navigation";
  import { Authorizer } from "@authorizerdev/authorizer-svelte";
  import type { AuthorizerState } from "@authorizerdev/authorizer-svelte/types";

  let auth_state : AuthorizerState;
  const auth_context = getContext("authorizerContext");
  auth_context.subscribe( (data : AuthorizerState) => { auth_state = data; } );
  
  $: {
    if (auth_state.user) {
      const auth_id = auth_state.user.id;
      const access_token = auth_state.token?.access_token;
      const expires_in = auth_state.token?.expires_in;

      if (auth_id && access_token && expires_in) {
        auth_state.logout();
        goto(`/redirect/?auth_id=${auth_id}&access_token=${access_token}&expires_in=${expires_in}`);
      }
    }
  }
</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen p-16">
  <Authorizer />
</main>
