<script lang="ts">
  export let data;
  const club = data.club;
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
                <img src="/abstract-characters/abstract-character-1.svg" alt={`Member Avatar - Name`}/>
              </div>
            </div>
            <div>
              <div class="font-bold">Hart Hagerty</div>
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
            <button class="btn btn-outline btn-info btn-xs">Edit</button>
            <button class="btn btn-outline btn-error btn-xs">Delete</button>
          </div>
        </th>
      </tr>
    </tbody>
  </table>
</section>
