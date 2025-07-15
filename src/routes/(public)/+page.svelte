<script lang="ts">
    import api from '$lib/api/index';
    import { handleAxiosError } from '$lib/utils/errorHandler';
    import type { Innovation } from '$lib/types/innovation';
    import type { Category } from '$lib/types/category';
    import { onMount } from 'svelte';

    let innovations: Innovation[] = [];
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
        }
    }

    async function fetchInnovation() {
        try {
            const response = await api.get('/innovations');
            console.log('Respons inovasi:', response.data.data.data);
            innovations = response.data.data.data;
        } catch (err) {
            console.error('Gagal mengambil inovasi:', err);
            error = handleAxiosError(err, 'Gagal mengambil inovasi');
        }
    }

    onMount(async () => {
        loading = true;
        await Promise.all([fetchCategories(), fetchInnovation()]);
        loading = false;
    });

    $: totalInnovations = innovations.length || categories.reduce((sum, cat) => sum + (cat.jumlah_inovasi || 0), 0);
</script>

<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Inovasi untuk Kota Bengkulu Lebih Baik</h4>
            <div class="page-title-right">
                <p class="text-muted mb-0">Temukan program unggulan dan solusi digital dari Pemerintah Kota Bengkulu</p>
            </div>
        </div>
    </div>
</div>

{#if loading}
    <p>Memuat data...</p>
{:else if error}
    <p style="color: red;">Kesalahan: {error}</p>
{:else if categories.length === 0 && innovations.length === 0}
    <p>Tidak ada data ditemukan.</p>
{:else}
    <div class="row">
        <div class="col-xl-2 col-md-6" title="Total Inovasi">
            <div class="card card-h-100">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-12">
                            <span class="text-muted mb-3 lh-1 d-block text-truncate">Total Inovasi</span>
                            <h4>
                                <span class="counter-value" data-target="{totalInnovations}">{totalInnovations}</span>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {#each categories as category}
            <div
                class="col-xl-2 col-md-6"
                title={category.nama_kategori === 'Perangkat Daerah'
                    ? 'Perangkat Daerah, Kecamatan, RSHD, RSTG dan Perumda Tirta Hidayah'
                    : category.nama_kategori}
            >
                <div class="card card-h-100">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-12">
                                <span class="text-muted mb-3 lh-1 d-block text-truncate">{category.nama_kategori}</span>
                                <h4>
                                    <span class="counter-value">{category.jumlah_inovasi}</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div id="inovasi" class="row mt-4">
        <div class="col-12">
            <h5 class="mb-3">Inovasi Terbaru</h5>
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
                    <p class="text-muted mb-2">Inovasi Tahun {innovation.tahun}</p>
                    <h5><a href="#" class="text-body">{innovation.nama_inovasi}</a></h5>
                    <div class="mt-3">
                        <a href="/inovasi" class="align-middle font-size-15">Lihat detailnya <i class="mdi mdi-chevron-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    {/each}
    </div>

    <div class="row justify-content-center mb-4">
        <div class="col-md-3">
            <div>
                <ul class="pagination mb-sm-0">
                    <li class="page-item disabled">
                        <a href="#" class="page-link"><i class="mdi mdi-chevron-left"></i></a>
                    </li>
                    <li class="page-item active">
                        <a href="#" class="page-link">1</a>
                    </li>
                    <li class="page-item">
                        <a href="#" class="page-link">2</a>
                    </li>
                    <li class="page-item">
                        <a href="#" class="page-link">3</a>
                    </li>
                    <li class="page-item">
                        <a href="#" class="page-link">4</a>
                    </li>
                    <li class="page-item">
                        <a href="#" class="page-link">5</a>
                    </li>
                    <li class="page-item">
                        <a href="#" class="page-link"><i class="mdi mdi-chevron-right"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
{/if}

<style>
    .card-h-100 {
        height: 100%;
    }
    .text-muted {
        color: #6c757d;
    }
    .font-size-15 {
        font-size: 15px;
    }
    .counter-value {
        font-weight: bold;
    }
</style>