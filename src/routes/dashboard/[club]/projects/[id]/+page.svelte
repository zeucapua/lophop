<script lang="ts">
  export let data;

  let project = data.project;
  let submissions = data.submissions;
</script>

<form method="POST" action="?/updateProject" >
  <input name="title" type="text" value={project.title} />
  <input name="content" type="text" value={project.content} />
  <button>Save</button>
</form>

{#if submissions.length === 0}
  <p>There are no submissions yet.</p>
{:else}
  {#each submissions as submission}
    <p>{submission.content}</p> 
  {/each}
{/if}
