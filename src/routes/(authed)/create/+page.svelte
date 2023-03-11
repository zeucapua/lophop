<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import type { ActionData } from "./$types";

  let value : string | null;
  export let form : ActionData;

  onMount(() => {
    const searchParams = $page.url.searchParams;
    value = searchParams.get("value");
    if (!value) { goto("/dashboard"); }
  });

  $: console.log({form});
</script>


<form method="POST" use:enhance>
{#if !form || form?.status === "presently"}

  {#if form?.status === "presently"}
    <p>You are already in this club!</p>
  {/if}
  <label>
    Club Name: <input name="club_name" type="text" />
  </label>
  <button formAction="?/findClub">Next</button>

{:else} 


  {#if form.status === "found"}
    <p>{form.club_name} found! Enter the secret to join!</p>
    <p>Other Advisors in this Club:</p>
    {#each form.advisors as advisor}
      <p>{advisor.name}</p>
    {/each}
  {:else if form.status === "available"}
    <p>{form.club_name} is available! Set a password to remember</p>
  {/if}

  {#if form?.unmatching}
    <p>Secrets must be the same!</p>
  {/if}

  <label>
    Secret: <input name="secret" type="password" />
  </label>
  <label>
    Reenter Secret: <input name="secret2" type="password" />
  </label>
  <input name="club_name" type="hidden" value={form.club_name} />
  <input name="status" type="hidden" value={form.status} />
  <button formAction="?/joinClub">Next</button>

{/if}
</form>





