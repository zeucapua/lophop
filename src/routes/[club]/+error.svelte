<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let timer = 5000;
  let counter; 

  function countdown() {
    timer -= 1000;
    if (timer === 0) { clearInterval(counter); goto("/"); }
  }

  onMount(() => {
    counter = setInterval(countdown, 1000);
  });
</script>

<p>There's been an error: {$page.status} {$page.error?.message}</p>
<p>Redirecting in {timer / 1000}s</p>


