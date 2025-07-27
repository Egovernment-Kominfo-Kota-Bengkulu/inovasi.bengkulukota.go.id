<script lang="ts">
    import api from '$lib/api/index';
    import type { Innovation } from '$lib/types/innovation';
    import type { Category } from '$lib/types/category';
    import { handleAxiosError } from '$lib/utils/errorHandler';
    import { onMount } from 'svelte';
  import PlaceholdersInvoasi from '$lib/components/PlaceholdersInvoasi.svelte';

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

<div class="row">
    <div class="col-lg-8">
        <div class="card">
            <div class="card-body">
                {#if loading}
                    <PlaceholdersInvoasi />
                {:else if error}
                    <p class="error">{error}</p>
                {:else if innovation}
                    <div class="">
                        <div class="mb-4">
                            <div class="ratio ratio-16x9 img-fluid">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/_ckl62AxFcw?si=LC56HifAHMmffOkO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                        </div>
                        <div class="text-left mb-4">
                            <h4>{innovation.nama_inovasi}</h4>
                        </div>
                        <div class="text-left">
                            <div class="row">
                                <div class="col-sm-2">
                                    <div class="mt-4 mt-sm-0">
                                        <p class="text-muted mb-2">Tahun</p>
                                        <h5 class="font-size-15">{innovation.tahun}</h5>
                                    </div>
                                </div>
                                <div class="col-sm-10">
                                    <div class="mt-4 mt-sm-0">
                                        <p class="text-muted mb-2">Dibuat oleh</p>
                                        <h5 class="font-size-15">{innovation.organization.nama_organisasi}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>

                        <div class="mt-4">
                            <div class="text-muted font-size-14">
                                <article>
                                    {@html innovation.rancang_bangun}
                                </article>
                            </div>
                        </div>
                    </div>
                {:else}
                    <p>Data tidak ditemukan</p>
                {/if}
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
</div> 