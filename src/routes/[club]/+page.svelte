<script lang="ts">
  import type { PageData } from "./$types";
  export let data : PageData;
  
</script>


<form method="POST">
  <input name="secret" type="password" placeholder="Enter Secret" />
  <button>Enter</button>
</form>
