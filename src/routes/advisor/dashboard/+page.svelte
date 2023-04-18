<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type { User } from "@authorizerdev/authorizer-js";
  import type { AuthorizerState } from "@authorizerdev/authorizer-svelte/types";

  let auth_state : AuthorizerState;
  const auth_context = getContext("authorizerContext");
  auth_context.subscribe( (data : AuthorizerState) => { auth_state = data } );

  let user : User | null;

  onMount(() => {
    console.log({ auth_state });
    user = auth_state.user;
    if (!user) { goto("/advisor"); }
  });
</script>


<p>{user?.email}</p>
