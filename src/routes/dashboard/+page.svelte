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
    console.log({data});
    clubs = data.clubs;
    return {
      id: data.id,
      name: data.name,
      auth_id: data.auth_id,
    } as Advisor;
  }

  onMount(async() => { 
    if (!form) {
      console.log("fetched onMount");
      advisor = await getAdvisor(auth_state.user?.id); 
    }
    else { console.log("fetched Form"); advisor = form as Advisor; }
  });
  
</script>

{#if auth_state.user}
  {#if !advisor && !form}
    <p>What's your name?</p>
    <form method="POST">
      <input name="name" type="text" />
      <input name="auth_id" type="hidden" value={auth_state.user?.id} />
    </form>
  {:else}
    <p>{advisor.name}</p>
    <p>{advisor.auth_id}</p>
    {#if clubs.length > 0}
      {#each clubs as club}
        <p>{club.name}</p>
        <p>{club.id}</p>
      {/each}
    {:else}
      <p>You should create a club</p>
    {/if}
    <button on:click={logoutHandler}>Logout</button>
  {/if}
{:else}
  <p>There's been an error!</p>
  <a href="/login">Go back to Login</a>
{/if}
