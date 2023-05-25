<script lang="ts">
  import ScratchEmbed from '$lib/ScratchEmbed.svelte';
  export let data;
  const project = data.project;
  const submissions = data.submissions;
  const member = data.member;
</script>

<a href={`/${data.club.slug}/home`} class="font-quicksand w-fit btn btn-accent">Home</a>
<h2 class="text-center text-5xl font-poppins font-bold text-primary">{project.title}</h2>
<p class="text-xl font-quicksand">{project.content}</p>

<section>
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-3xl font-poppins font-bold text-primary">Submissions</h3>
    <label for="submission-modal" class="btn btn-primary font-quicksand">
      Submit
    </label>
  </div>
  <div class="divider" />
  {#if submissions.length > 0}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full p-4">
      {#each submissions as submission}
        <ScratchEmbed {submission} />
      {/each}
    </div>
  {:else}
    <p class="font-quicksand font-bold text-center">No one has submitted a project yet. Be the first!</p> 
  {/if}
</section>

<input type="checkbox" id="submission-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <form method="POST" action="?/submitProject" class="form-control modal-box relative gap-4">
    <label for="submission-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <h3 class="font-bold text-lg">Submit a Project</h3>
    <div>
      <label class="label">
        <span class="label-text">Title</span> 
      </label>
      <input name="title" type="text" class="w-full input input-bordered" />
    </div>
    <div>
      <label class="label">
        <span class="label-text">Link</span> 
      </label>
      <input name="link" type="url" class="w-full input input-bordered" />
    </div>
    <input name="member_id" type="hidden" value={member?.id} />
    <div class="modal-action">
      <label for="submission-modal">
        <button class="btn btn-accent">Done</button>
      </label>
    </div>
  </form>
</div>
