<script lang="ts">
  import api from '$lib/api/index';
  import PlaceholdersIndex from '$lib/components/PlaceholdersIndex.svelte';
  import type { Innovation } from '$lib/types/innovation';
  import type { PaginatedResponse } from '$lib/types/pagination';
  import { handleAxiosError } from '$lib/utils/errorHandler';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let innovations: Innovation[] = [];
  let currentPage: number = 1;
  let lastPage: number = 1;
  let links: PaginatedResponse['data']['links'] = [];
  let loading: boolean = true;
  let error: string | null = null;

  // Get the search query from the URL
  $: searchQuery = $page.params.query;

  async function fetchSearchResults(page: number = 1) {
    try {
      console.log(`Fetching search results for query: ${searchQuery}, page: ${page}`);
      const response = await api.get<PaginatedResponse>(`/search?query=${encodeURIComponent(searchQuery)}&page=${page}`);
      console.log('Search results:', response.data.data.data);
      innovations = response.data.data.data;
      currentPage = response.data.data.current_page;
      lastPage = response.data.data.last_page;
      links = response.data.data.links;
    } catch (err) {
      console.error('Failed to fetch search results:', err);
      error = handleAxiosError(err, 'Gagal mengambil hasil pencarian');
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    loading = true;
    await fetchSearchResults();
    loading = false;
  });

  async function handlePageChange(url: string | null) {
    if (!url) {
      console.log('No URL provided for pagination');
      return;
    }
    const page = new URL(url).searchParams.get('page');
    if (page) {
      console.log(`Navigating to page: ${page}`);
      loading = true;
      await fetchSearchResults(parseInt(page));
    } else {
      console.error('Page number not found in URL:', url);
    }
  }
</script>

{#if loading}
  <PlaceholdersIndex />
{:else if error}
  <p style="color: red;">Kesalahan: {error}</p>
{:else if innovations.length === 0}
  <p>Tidak ada data ditemukan untuk pencarian "{searchQuery}".</p>
{:else}
  <section id="inovasi" class="my-4">
    <div class="row">
      <div class="col-12">
        <p>Hasil Pencarian untuk "{searchQuery}"</p>
      </div>
      {#each innovations as innovation}
        <div class="col-xl-4 col-sm-6">
          <div class="card">
            <div class="">
              <div class="ratio ratio-16x9 img-fluid">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/M2wgPR5rEqM?si=0VnEUFydXlVK9OjV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text mb-0">
                <small class="text-muted">{innovation.tahun}</small>
              </p>
              <p class="text-muted text-truncate d-inline-block w-100 mb-0">{innovation.organization.nama_organisasi}</p>
              <h5 class="text-truncate d-inline-block w-100 mb-0">
                <a href="#" class="text-body text-truncate d-inline-block w-100">{innovation.nama_inovasi}</a>
              </h5>
              <div class="mt-3">
                <a href="/{innovation.id}" class="align-middle font-size-15">Lihat detailnya <i class="mdi mdi-chevron-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
{/if}

<div class="row justify-content-center mb-4">
  <div class="col-md-3">
    <div>
      <ul class="pagination mb-sm-0">
        {#each links as link (link.label)}
          <li class="page-item {link.active ? 'active' : ''} {!link.url ? 'disabled' : ''}">
            <a
              href="#"
              class="page-link"
              on:click|preventDefault={() => handlePageChange(link.url)}
            >
              {#if link.label.includes('Previous')}
                <i class="mdi mdi-chevron-left"></i>
              {:else if link.label.includes('Next')}
                <i class="mdi mdi-chevron-right"></i>
              {:else}
                {link.label}
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>