<script lang="ts">
  import { onMount } from "svelte";
  import type { Club } from "@prisma/client";

  let new_name = "";
  let clubs : Club[] = [];
  let clubs_loading = false;

  async function createClub() {
    const response = await fetch("/api/prisma/clubs/single", {
      method: "POST",
      body: JSON.stringify({ name: new_name }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    console.log({ data });

    await getAllClubs();
  }

  async function getAllClubs() {
    clubs_loading = true;
    const response = await fetch("/api/prisma/clubs/multiple", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    clubs = data.clubs;
    clubs_loading = false;
  }

  async function deleteClub(id : number) {
    const response = await fetch("/api/prisma/clubs/single", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    console.log({ data });

    await getAllClubs();
  }

  onMount(async() => {
    await getAllClubs();
  });
</script>

<main class="flex flex-col gap-8 p-16">
  <div class="flex flex-row gap-8">
    <p class="text-lg">lophop status</p>
    {#if clubs_loading}
      <img src="/favicon.png" alt="icon" class="w-fit animate-spin" />
    {/if}
  </div>
  
  <input bind:value={new_name} placeholder="Name" class="border px-4 py-2" />
  <button on:click={createClub} class="border px-4 py-2 rounded-md">
    New Club
  </button>

  

  {#if clubs}
    <ul class="list-disc">
      {#each clubs as club}
        <li>
          <section class="flex flex-row gap-8">
            <button class="hover:underline">{club.name}</button>

            <button 
              on:click={() => deleteClub(club.id)}
              class="border border-red rounded-md text-red px-4 py-2"
            >
              Delete
            </button>
          </section>

        </li> 
      {/each}
    </ul>
  {:else}
    <p>No clubs</p>
  {/if}
</main>
