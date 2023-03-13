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

  $: final_slug = setFinalSlug(action);
  function setFinalSlug(action : string) {
    if (action === "join") { return form?.club_slug }
    else if (action === "create") {
      return form?.slug_variation ?? form?.club_slug;
    }
  }
</script>

<main class="flex flex-col justify-center w-full min-w-screen h-full min-h-screen p-16 gap-8">

{#if value === "club"}

<form method="POST" use:enhance class="flex flex-col gap-8 border-solid p-8 border-4">
  <fieldset class="flex flex-col gap-8 items-center">
    <p class="text-5xl font-comiccat text-center">Lead a Club!</p>
    <div class="flex flex-row gap-4">
      <input 
        name="club_name" type="text" value={form?.club_name ?? ""}
        class="border-2 px-4 py-2 text-xl font-spacemono border-dotted focus:border-solid"
      />
      <button 
        formAction="?/findClub"
        class="border-2 border-dotted px-4 py-2 hover:border-solid font-comiccat">
        Find
      </button>
    </div>
  </fieldset>

  {#if form}

    <fieldset class="flex flex-row mx-auto justify-center w-full max-w-3xl h-full gap-8">
      {#if form.status === "presently" || form.status === "found"}
        <div class="flex border-2 border-neutral-600 px-8 py-4 items-center">
          {#if form.status === "presently"}
            <div class="flex flex-col">
              <p>You are already in</p>
              <p>lophop.club/{form.club_slug}</p>
            </div>
          {:else if form.status === "found"}
            <label>
              <input type="radio" bind:group={action} value="join">
              <p>Club already exists at </p>
              <p>lophop.club/{form.club_slug}</p>
            </label>
          {/if}
        </div>
      {/if}

      <div class="flex border-2 border-neutral-600 px-8 py-4 items-center">
        <label class="flex flex-row gap-8">
          <input type="radio" bind:group={action} value="create">
          <div class="flex flex-col">
            <p>Create a new club at </p>
            <p>lophop.club/{form.slug_variation ?? form.club_slug}</p>
          </div>
        </label>
      </div>
    </fieldset>

    <input name="final_slug" type="hidden"
      value={final_slug}
    />

    {#if action} 
      <fieldset class="flex flex-col items-center gap-8">
        <p class="font-comiccat text-center">Enter the Club's Secret</p>

        {#if form.unmatched}
          <p class="text-red font-spacemono">Secrets must be the same!</p> 
        {/if}

        <input 
          name="secret" type="password" placeholder="Secret"
          class="border border-dotted focus:border-solid px-4 py-2 font-spacemono"
        />
        <input 
          name="confirm_secret" type="password" placeholder="Confirm Secret"
          class="border border-dotted focus:border-solid px-4 py-2 font-spacemono"
        />

        {#if action === "join"}
          <button 
            formAction="?/joinClub"
            class="border-2 border-dotted focus:border-solid px-4 py-2 font-comiccat"
          >
            Join
          </button>
        {/if}
        {#if action === "create"}
          <button 
            formAction="?/createClub"
            class="border-2 border-dotted focus:border-solid px-4 py-2 font-comiccat"
          >
            Create
          </button>
        {/if}
      </fieldset>
    {/if}

  {/if}
</form>


{/if}




</main>


