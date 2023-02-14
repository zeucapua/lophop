<script lang="ts">
  import type { ActionData } from "./$types";

  export let form : ActionData;
</script>
<form method="POST" action="?/submit" class="flex flex-col gap-8 mx-auto">
  {#if form?.missing}
    <p>Make sure you write in each box before submitting!</p>
  {/if}
  <label class="text-xl">
    This project is called
    <input 
      required
      value={form?.title ?? ""}
      name="title" type="text" 
      class="border rounded-md px-4 py-2" />
  </label>
  <label class="text-xl">
    Made by
    <input 
      required
      value={form?.author ?? ""}
      name="author" type="text" 
      class="border rounded-md px-4 py-2" />
  </label>
  <label class="text-xl">
    Here's the code:
    <input 
      required
      value={form?.link ?? ""}
      name="link" type="url" 
      class="border rounded-md px-4 py-2" />
  </label>
  <button>Submit</button>
</form>

