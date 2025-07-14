<script lang="ts">
  import { onMount } from 'svelte';
  import type { Innovation } from '$lib/api/test';
  // import { getInnovations } from '$lib/api/test';

  let innovations: Innovation[] = [];
  let error: string = '';

  // onMount(async () => {
  //   try {
  //     const data = await getInnovations();
  //     innovations = data;
  //   } catch (err: any) {
  //     if (err instanceof Error) {
  //       error = err.message;
  //     } else {
  //       error = 'Gagal mengambil data inovasi.';
  //     }
  //   }
  // });
</script>

{#if error}
  <p>{error}</p>
{:else}
  <ul>
    {#each innovations as i}
      <li>{i.nama_inovasi}</li>
    {/each}
  </ul>
{/if}
