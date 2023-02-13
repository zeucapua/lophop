<script lang="ts">
  let new_name = "";

  async function createClub() {
    const response = await fetch("/api/prisma/clubs/single", {
      method: "POST",
      body: JSON.stringify({ name: new_name }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    console.log({ data });

  }
</script>

<main class="flex flex-col gap-8 p-16">
  <div class="flex flex-row gap-8">
    <p class="text-lg">lophop status</p>
  </div>
  
  <input bind:value={new_name} placeholder="Name" class="border px-4 py-2" />
  <button on:click={createClub} class="border px-4 py-2 rounded-md">
    New Club
  </button>
</main>
