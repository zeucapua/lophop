<script lang="ts">
  import { enhance } from "$app/forms";
  import { getContext } from "svelte";
  import type { ActionData } from "./$types";
  import type { AuthorizerState } from "@authorizerdev/authorizer-svelte/types";

  let auth_state : AuthorizerState;
  const auth_context = getContext("authorizerContext");

  export let form : ActionData;

</script>

<main class="text-content flex flex-col w-full min-w-screen h-full min-h-screen p-16 bg-base">

<form method="POST" use:enhance>
  {#if !form}
    <label>
      Club Name: <input name="club_name" type="text" />
    </label>
    <input name="auth_id" type="hidden" value={auth_state.user?.id} />
    <button formaction="?/findClub">Submit</button>
  {:else if form.club}
    <p>{form.club.name} found! Say the secret to join!</p>
    <input name="secret" type="text" />
    <input name="club_name" type="hidden" value={form.club.name} />
  {/if}
</form>

</main>
