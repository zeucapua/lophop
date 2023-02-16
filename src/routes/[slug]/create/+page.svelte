<script lang="ts">
  import type { ActionData } from "./$types";

  export let form : ActionData;
</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen p-16 bg-base">
  <form method="POST" action="?/submit" class="flex flex-col gap-8 mx-auto">
    {#if form?.missing}
      <p class="text-xl text-content text-center">
        Make sure you write in each box before submitting!</p>
    {/if}
    <label class="text-4xl text-content">
      This project is called
      <input 
        required
        value={form?.title ?? ""}
        name="title" type="text" 
        class="border rounded-md px-4 py-2 bg-base" />
    </label>
    <label class="text-4xl text-content">
      Made by
      <input 
        required
        value={form?.author ?? ""}
        name="author" type="text" 
        class="border rounded-md px-4 py-2 bg-base" />
    </label>
    <label class="text-4xl text-content">
      Here's the code:
      <input 
        required
        value={form?.link ?? ""}
        name="link" type="url" 
        class="border rounded-md px-4 py-2 bg-base" />
    </label>
    <button>Submit</button>
  </form>
</main>
