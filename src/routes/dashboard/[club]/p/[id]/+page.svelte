<script lang="ts">
  export let data;

  const club = data.club;
  let project = data.project;
  let submissions = data.submissions;
</script>

<a href={`/dashboard/${club}`} class="">Dashboard</a>

<form method="POST">
  <div class="flex flex-row justify-between items-center">
    <div>
      <label class="label">
        <span class="label-text text-lg text-base-content/80">Title</span>
      </label>
      <input 
        name="title" type="text" value={project.title} 
        class="text-2xl input input-primary input-lg input-bordered" 
      />
    </div>
    <div>
      <button class="btn btn-outline btn-error" formaction="?/deleteProject">Delete</button>
      <button class="btn btn-primary" formaction="?/saveProject">Save</button>
    </div>
  </div>
  <label class="label">
    <span class="label-text text-lg text-base-content/80">Content</span>
  </label>
  <textarea 
    name="content" value={project.content} 
    class="scroll-p-8 resize-none text-xl textarea textarea-bordered w-full " 
  />
</form>

{#if submissions.length > 0}
  {#each submissions as submission}
    <p>{submission.title}</p>
  {/each}
{:else}
  <p>There are no submissions yet</p>
{/if}
