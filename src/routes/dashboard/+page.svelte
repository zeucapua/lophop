<script lang="ts">
  import type { PageData } from "./$types";

  export let data : PageData;

  $: advisor = data.advisor;
  $: clubs = advisor.clubs;
</script>

<p>Dashboard</p>

<p>{advisor.name}</p>
<p>{clubs}</p>
