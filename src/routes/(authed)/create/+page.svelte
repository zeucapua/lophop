<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import type { ActionData } from "./$types";

  let value : string | null;
  export let form : ActionData;

  let action : string;


  onMount(() => {
    const searchParams = $page.url.searchParams;
    value = searchParams.get("value");
    if (!value) { goto("/dashboard"); }
  });

  $: console.log({form});
</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen p-16 gap-8">

{#if value === "club"}

<form method="POST" use:enhance>
  <fieldset class="w-full max-w-3xl h-full gap-4">
    <legend class="text-5xl font-comiccat">Lead a Club!</legend>
    <input name="club_name" type="text" value={form?.club_name ?? ""}/>
    <button class="border-2 border-dotted hover:border-solid font-comiccat">Find</button>
  </fieldset>

  {#if form}

    {#if form.status === "presently"}
      <p>You are already in lophop.club/{form.club_slug}</p>
    {:else if form.status === "found"}
      <label>
        <input type="radio" bind:group={action} value="join">
        <p>Club already exists at </p>
        <p>lophop.club/{form.club_slug}</p>
      </label>
    {/if}

    <label>
      <input type="radio" bind:group={action} value="create">
      <p>Create a new club at </p>
      <p>lophop.club/{form.slug_variation}</p>
    </label>

    <input name="final_slug" type="hidden"
      value={ () => {
          if (action === "join") { return form?.club_slug; }
          else if (action === "create") { return form?.slug_variation; }
          else { return "" }
      }}
    />

    {#key action}
      <p>Enter the Club's Secret</p>
      {#if form.unmatched}
        <p>Secrets must be the same!</p> 
      {/if}
      <label>
        Secret
        <input name="secret" type="password" required />
      </label>
      <label>
        Confirm Secret
        <input name="confirming_secret" type="password" required />
      </label>
      {#if action === "join"}
        <button formAction="?/joinClub">Join</button>
      {/if}
      {#if action === "create"}
        <button formAction="?/createClub">Join</button>
      {/if}
    {/key}
  {/if}
</form>


{/if}



</main>


