<script lang="ts">
  import { enhance } from '$app/forms';
  export let data;
  export let form; 
</script>


<form method="POST" use:enhance>
  <input name="secret" type="password" placeholder="Enter Secret" />
  <button formaction="?/whisper">Enter</button>
</form>
