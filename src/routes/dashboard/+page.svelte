<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { goto } from "$app/navigation";
  import type { Advisor, Club } from "@prisma/client";
  import type { ActionData } from "./$types";
  import type { AuthorizerState } from "@authorizerdev/authorizer-svelte/types";

  let advisor : Advisor;
  let clubs : Club[]; 
  let auth_state : AuthorizerState;
  const auth_context = getContext("authorizerContext");

  export let form : ActionData;

  auth_context.subscribe((data : AuthorizerState) => { auth_state = data; });

  async function logoutHandler() { 
    await auth_state.logout(); 
    goto("/");
  }

  async function getAdvisor(auth_id : string) {
    const response = await fetch("/api/prisma/get-advisor", {
      method: "POST",
      body: JSON.stringify({ auth_id: auth_id }),
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    const data = result.data;
    clubs = data.clubs;
    return {
      id: data.id,
      name: data.name,
      auth_id: data.auth_id,
    } as Advisor;
  }

  onMount(async() => { 
    if (form?.advisor) { advisor = form?.advisor; }
    else {
      advisor = await getAdvisor(auth_state.user?.id); 
    }
  });
  
</script>

<main class="relative font-spacemono flex flex-col w-full min-w-screen h-full min-h-screen bg-base p-16">

{#if auth_state.user?.id}
  {#if !advisor && !form}

    <p>What's your name?</p>
    <form method="POST" action="?/updateName">
      <input name="name" type="text" />
      <input name="auth_id" type="hidden" value={auth_state.user?.id} />
    </form>

  {:else}

    <nav class="absolute inset-x-0 top-0 bg-base items-center shadow-lg px-8 py-4 flex flex-row">
      <img src="lophop.png" alt="Lophop logo" class="aspect-square w-16" />
      <button on:click={logoutHandler} class="text-xl text-content">Logout</button>
    </nav>

    <section class="flex flex-col gap-8 py-16">
      <p class="text-8xl text-content font-comiccat">Hello {advisor.name}!</p>

      <div class="flex flex-col gap-8">
        <p class="text-5xl text-content font-comiccat">
          Clubs
          <span>
            <a href="/dashboard/add-club"><button>+</button></a>
          </span>
        </p>
        <section 
        class="flex flex-col gap-8 w-fit h-full p-8 border border-content rounded-md">
          {#if clubs.length > 0}
            {#each clubs as club}
              <p>{club.name}</p>
            {/each}
          {:else}
            <p class="text-3xl text-content">You don't have any clubs!</p> 
            <p class="text-3xl text-content">Create or Join One using the + button</p> 
          {/if}
        </section>
      </div>
    </section>

  {/if}
{:else}
  <section>
    <p>There's been an error!</p>
    <a href="/login">Go back to Login</a>
  </section>
{/if}

</main>
