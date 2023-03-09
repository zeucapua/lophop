<script lang="ts">
  import type { PageData } from "./$types";

  export let data : PageData;
  const advisor = data.advisor; 

  $: console.log({ advisor });
</script>

<main>
  <p>Dashboard</p>
  <p>Advisor Id: {advisor.id}</p>
  <form method="POST" action="?/logout">
    <button>Logout</button>
  </form>
</main>
