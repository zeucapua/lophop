<script lang="ts">
  import { onMount } from "svelte";
  import type { Member } from "@prisma/client";

  export let member : Member;
  export let club_slug : string;

  let checked : boolean;

  onMount(() => {
    checked = member.attendance.filter(day => day === new Date().toDateString()).length > 0;
  });

  async function toggleAttendance(checked : boolean) {
    console.log(member.id, { checked });
    await fetch("/api/attendance", {
      method: "POST",
      body: JSON.stringify({ checked, member_id: member.id, club_slug }),
      headers: { "Content-Type": "application/json" },
    });
  }
</script>

<input bind:checked={checked} on:change={async () => toggleAttendance(checked)}  type="checkbox" class="checkbox" />
