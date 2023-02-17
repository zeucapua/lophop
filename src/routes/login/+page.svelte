<script lang="ts">
  import { Authorizer } from "@authorizerdev/authorizer-svelte";
  import { getContext } from "svelte";

  const store = getContext("authorizerContext");
  let state : { token: string; user: any; loading: boolean; logout: Function; };

  store.subscribe((data : any) => {
    state = data;
  });

  const logoutHandler = async () => { await state.logout(); }
</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen p-16 bg-base">
  <Authorizer />
  {#if state.user}
    <p>{state.user.email}</p> 
    {#if state.loading}
      <p>Loading...</p> 
    {:else}
      <button on:click={logoutHandler}>Logout</button>
    {/if}
  {/if}
</main>


