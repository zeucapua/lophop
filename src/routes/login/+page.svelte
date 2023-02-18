<script lang="ts">
  import { getContext } from "svelte";
  import { current_advisor } from "$lib/stores";
  import { Authorizer } from "@authorizerdev/authorizer-svelte";

  let state : { token: string; user: any; loading: boolean; logout: Function; }
  const auth_context = getContext("authorizerContext");

  auth_context.subscribe((data : any) => { state = data; });

  async function logout() { await state.logout(); }

  $: current_advisor.set( state.user?.id );
</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen gap-8 p-16">
  <p class="text-5xl font-bold text-center">Join the Club!</p>
  <div class="w-full max-w-xl mx-auto">
    <Authorizer />
  </div>
  <button on:click={logout}>Logout</button>
</main>
