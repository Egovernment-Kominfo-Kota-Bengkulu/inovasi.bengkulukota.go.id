<script lang="ts">
    import api from '$lib/api/index';
    import type { Innovation } from '$lib/types/innovation';
    import type { Category } from '$lib/types/category';
    import { handleAxiosError } from '$lib/utils/errorHandler';
    import { onMount } from 'svelte';

    export let data: {id: string};
    let innovation: Innovation | null = null;
    let categories: Category[] = [];
    let loading: boolean = true;
    let error: string | null = null;

    async function fetchCategories() {
        try {
            const response = await api.get('/stats/innovation/category');
            console.log('Respons kategori:', response.data.data);
            categories = response.data.data;
        } catch (err) {
            console.error('Gagal mengambil kategori:', err);
            error = handleAxiosError(err, 'Gagal mengambil kategori');
        } finally {
            loading = false;
        }
    }

    async function fetchInnovation() {
        try {
            const response = await api.get(`/innovations/${data.id}`);
            console.log('Respons inovasi:', response.data.data);
            innovation = response.data.data;
        } catch (err) {
            console.error('Gagal mengambil inovasi:', err);
            error = handleAxiosError(err, 'Gagal mengambil inovasi');
        } finally {
            loading = false;
        }
    }

    onMount(async () => {
        loading = true;
        await Promise.all([fetchCategories(), fetchInnovation()]);
        loading = false;
    });
</script>

{#if loading}
    <p>Loading...</p>
{:else if error}
    <p class="error">{error}</p>
{:else if innovation}
    <div>
        <h1>{innovation.nama_inovasi}</h1>
        <p>{innovation.rancang_bangun}</p>
        <small>Dibuat pada: {innovation.tahun}</small>
    </div>
{:else}
    <p>Data tidak ditemukan</p>
{/if}

<div class="row">
    <div class="col-lg-8">
        <div class="card">
            <div class="card-body">
                <div class="">
                    <div class="mb-4">
                        <div class="ratio ratio-16x9 img-fluid">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/_ckl62AxFcw?si=LC56HifAHMmffOkO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="text-left mb-4">
                        <h4>Beautiful Day with Friends</h4>
                    </div>
                    <div class="text-left">
                        <div class="row">
                            <div class="col-sm-4">
                                <div>
                                    <h6 class="mb-2">Categories</h6>
                                    <p class="text-muted font-size-15">Project</p>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="mt-4 mt-sm-0">
                                    <h6 class="mb-2">Tahun</h6>
                                    <p class="text-muted font-size-15">20 June, 2022</p>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="mt-4 mt-sm-0">
                                    <p class="text-muted mb-2">Post by</p>
                                    <h5 class="font-size-15">Gilbert Smith</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>

                    <div class="mt-4">
                        <div class="text-muted font-size-14">
                            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam enim ad minima veniam quis</p>

                            <p class="mb-4">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt</p>

                        </div>
                    </div>
                </div>
            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->
    </div>
    <!-- end col -->

    <div class="col-lg-4 ">
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <div class="mt-1">
                        <h5 class="mb-3">KATEGORI</h5>
                        <ul class="list-unstyled fw-medium px-2">
                            {#each categories as category}
                            <li><a href="javascript: void(0);" class="text-body pb-3 d-block border-bottom">{category.nama_kategori}<span class="badge bg-primary-subtle text-primary rounded-pill ms-1 float-end font-size-12">{category.jumlah_inovasi}</span></a></li>
                            {/each}
                        </ul>
                    </div>

                    <div class="mt-5">
                        <h5 class="mb-3">PEMENANG 2025</h5>
                        <div class="list-group list-group-flush">
                            <a href="javascript: void(0);" class="list-group-item text-muted pb-3 pt-0 px-2">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0 me-3">
                                        <img src="assets/images/small/img-3.jpg" alt="" class="avatar-xl h-auto d-block rounded">
                                    </div>
                                    <div class="flex-grow-1 overflow-hidden">
                                        <h5 class="font-size-13 text-truncate">Beautiful Day with Friends</h5>
                                        <p class="mb-0 text-truncate">10 Apr, 2022</p>
                                    </div>
                                </div>
                            </a>

                            <a href="javascript: void(0);" class="list-group-item text-muted py-3 px-2">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0 me-3">
                                        <img src="assets/images/small/img-4.jpg" alt="" class="avatar-xl h-auto d-block rounded">
                                    </div>
                                    <div class="flex-grow-1 overflow-hidden">
                                        <h5 class="font-size-13 text-truncate">Drawing a sketch</h5>
                                        <p class="mb-0 text-truncate">24 May, 2022</p>
                                    </div>
                                </div>
                            </a>

                            <a href="javascript: void(0);" class="list-group-item text-muted py-3 px-2">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0 me-3">
                                        <img src="assets/images/small/img-1.jpg" alt="" class="avatar-xl h-auto d-block rounded">
                                    </div>
                                    <div class="flex-grow-1 overflow-hidden">
                                        <h5 class="font-size-13 text-truncate">Coffee with friends</h5>
                                        <p class="mb-0 text-truncate">15 June, 2022</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div>
    </div>
</div> <!-- container-fluid -->