<script lang="ts">
  import type { PageData } from "./$types";

  export let data : PageData;
  const advisor = data.advisor; 

  $: console.log({ advisor });
</script>

<main class="flex flex-col w-full min-w-screen h-full min-h-screen p-16 gap-8">
  <p>Dashboard</p>
  <p>Advisor Id: {advisor.id}</p>
  <form method="POST" action="?/logout">
    <button>Logout</button>
  </form>
</main>
