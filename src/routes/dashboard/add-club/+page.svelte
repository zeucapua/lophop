<script lang="ts">
  import { enhance } from "$app/forms";
  import { getContext } from "svelte";
  import { goto } from "$app/navigation";
  import type { ActionData } from "./$types";
  import type { AuthorizerState } from "@authorizerdev/authorizer-svelte/types";

  let auth_state : AuthorizerState;
  const auth_context = getContext("authorizerContext");
  auth_context.subscribe( (data : AuthorizerState) => { auth_state = data; } );

  export let form : ActionData;

  $: if (form?.status === "success") goto("/dashboard");
</script>

<main class="text-content flex flex-col w-full min-w-screen h-full min-h-screen p-16 bg-base">

{#if form?.status === "fail"}
  <p>There's been an error</p>
{/if}
<form method="POST" use:enhance>
  {#if !form || form?.status === "already in"}
    {#if form?.status === "already in"}
      <p>You are already in this club!</p>
    {/if}
    <label>
      Club Name: <input name="club_name" type="text" />
    </label>
    <input name="auth_id" type="hidden" value={auth_state.user?.id} />
    <button formaction="?/findClub">Submit</button>
  {:else if form.status === "found"}
    <p>{form.club_name} found! Say the secret to join!</p>
    <p>
      Other advisors in the Club:
      {#each form.advisors as advisor}
        {advisor.name}
      {/each}
    </p>
    <input name="secret" type="text" />
    <input name="club_name" type="hidden" value={form.club_name} />
    <input name="auth_id" type="hidden" value={auth_state.user?.id} />
    <input name="status" type="hidden" value={form.status} />
    <button formaction="?/joinClub">Join</button>
  {:else if form.status === "not found"}
    <p>{form.club_name} is available! Set a secret for other to join!</p>
    <input name="secret" type="text" />
    <input name="club_name" type="hidden" value={form.club_name} />
    <input name="auth_id" type="hidden" value={auth_state.user?.id} />
    <input name="status" type="hidden" value={form.status} />
    <button formaction="?/joinClub">Create</button>
  {/if}
</form>

</main>
