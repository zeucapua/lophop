<script lang="ts">
  import { Submission } from "@prisma/client";
  export let submission : Submission;
</script>

<section class="card p-2 border-4 w-fit">
  <iframe src={`${submission.link}/embed?autostart=false`}
    loading="lazy"
    allowtransparency="true" 
    width="485" height="402" 
    frameborder="0" scrolling="no" 
    class="rounded-md"
  >
  </iframe>
  <div class="p-4 flex flex-row items-center justify-between">
    <div class="flex flex-col gap-2 align-center">
      <h5 class="text-2xl font-poppins font-bold text-secondary">{submission.title}</h5>
      <p class="text-xl font-quicksand">by {submission.member.name}</p>
    </div>
    <a href={submission.link} target="_blank" class="btn btn-accent btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13a.996.996 0 1 0 1.41 1.41L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"/></svg>
    </a>
  </div>
</section>
