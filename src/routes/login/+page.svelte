<script lang="ts">
  import { goto } from "$app/navigation";
  import { getContext } from "svelte";
  import { Authorizer } from "@authorizerdev/authorizer-svelte";
  import type { AuthorizerState } from "@authorizerdev/authorizer-svelte/types";

  let step = 0;
  let club = "";
  let user_type : "advisor" | "member";

  let auth_state : AuthorizerState;
  const auth_context = getContext("authorizerContext");
  auth_context.subscribe((data : AuthorizerState) => { auth_state = data; });

  $: { if (auth_state.user) { goto("/dashboard"); } }
</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen gap-8 p-16">

{#if step != 0 && user_type}

  {#if user_type === "advisor"}
    <p class="text-5xl font-bold text-center">Join the Club!</p>
    <div class="w-full max-w-xl mx-auto">
      <Authorizer 
        onLogin={() => { goto("/dashboard"); }}
        onSignup={() => { goto("/dashboard"); }}
      />
    </div>
  {:else}
    <p>What Club are You From?<p>
    <input type="text" bind:value={club} />
    <button on:click={() => {if (club) goto(`/${club}`)}}>Enter</button>
  {/if}

{:else}

  <p class="text-3xl text-center">Are you an advisor or member?</p>
  <label>
    <input type="radio" bind:group={user_type} value={"advisor"} />
    Advisor
  </label>
  <label>
    <input type="radio" bind:group={user_type} value={"member"} />
    Member
  </label>
  <button on:click={() => { step += 1; }}>Next</button>

{/if}

</main>
