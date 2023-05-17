<script lang="ts">
  export let data;
  const club = data.club;
  const members = club.members;
</script>

<h2 class="text-center text-5xl my-8 font-poppins font-bold text-primary">Club {club.name}</h2>

<section class="flex flex-col w-full mx-auto">
  <div class="flex flex-row justify-between items-center">
    <h3 class="text-3xl font-poppins font-bold text-primary">Members</h3>
    <label for="create-modal" class="btn btn-secondary font-quicksand font-bold">New Member</label>
  </div>

  <div class="divider" />

  <div class="overflow-x-auto w-full">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>Name</th>
          <th>Latest Submission</th>
          <th>Scratch Password</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {#each members as member}
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src={`/abstract-characters/abstract-character-${member.avatar}.svg`} alt={`Member Avatar - ${member.name}`}/>
                  </div>
                </div>
                <div>
                  <div class="font-bold">{member.name}</div>
                  <div class="text-sm opacity-50">username</div>
                </div>
              </div>
            </td>
            <td>
              Walking Around
              <br/>
              <span class="badge badge-ghost badge-sm">Submitted</span>
            </td>
            <td>Purple</td>
            <th>
              <div class="flex flex-row gap-4">
                <form method="POST">
                  <input name="id" type="hidden" value={member.id} />
                  <button class="btn btn-outline btn-info btn-xs">Edit</button>
                  <button formaction="?/deleteMember" class="btn btn-outline btn-error btn-xs">Delete</button>
                </form>
              </div>
            </th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>



<input type="checkbox" id="create-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <form method="POST" action="?/createMember" class="form-control modal-box relative gap-4">
    <label for="create-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <h3 class="font-bold text-lg">Create a New Member</h3>
    <div>
      <label class="label">
        <span class="label-text">Name</span> 
      </label>
      <input name="name" type="text" class="w-full input input-bordered" />
    </div>
    <div class="modal-action">
      <label for="create-modal">
        <button class="btn btn-accent">Done</button>
      </label>
    </div>
  </form>
</div>
