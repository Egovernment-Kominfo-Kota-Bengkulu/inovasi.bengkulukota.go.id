<script lang="ts">
    import axios from 'axios';
    import type { Innovation } from '$lib/types/innovation';
    import type { Category } from '$lib/types/category';
    import { onMount } from 'svelte';

    let innovationDaftar: Innovation[] = [];
    let categories: Category[] = [];
    let loading: boolean = true;
    let error: string | null = null;

    async function fetchCategories() {
        try {
            const response = await axios.get(
                'https://inovasibackend.bengkulukota.go.id/api/stats/innovation/category', {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`
                    },
                    timeout: 10000
                });
            console.log('Respons kategori:', response.data); // Debugging
            categories = response.data.data;
        } catch (err) {
            console.error('Gagal mengambil kategori:', err);
            if (axios.isAxiosError(err)) {
                if (err.code === 'ERR_NETWORK') {
                    error =
                        'Kesalahan jaringan: Tidak dapat terhubung ke server. Pastikan koneksi internet aktif atau server sedang berjalan.';
                } else if (err.response) {
                    error =
                        `Kesalahan server ${err.response.status}: ${err.response.data?.message || 'Kesalahan tidak diketahui'}`;
                } else {
                    error = err.message || 'Gagal mengambil kategori';
                }
            } else {
                error = 'Terjadi kesalahan tak terduga';
            }
        }
    }

    async function fetchInnovation() {
        try {
            const response = await axios.get('https://inovasibackend.bengkulukota.go.id/api/innovations', {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                timeout: 10000
            });
            console.log('Respons inovasi:', response.data); // Debugging
            innovationDaftar = response.data.data;
        } catch (err) {
            console.error('Gagal mengambil inovasi:', err);
            if (axios.isAxiosError(err)) {
                if (err.code === 'ERR_NETWORK') {
                    error =
                        'Kesalahan jaringan: Tidak dapat terhubung ke server. Pastikan koneksi internet aktif atau server sedang berjalan.';
                } else if (err.response) {
                    error =
                        `Kesalahan server ${err.response.status}: ${err.response.data?.message || 'Kesalahan tidak diketahui'}`;
                } else {
                    error = err.message || 'Gagal mengambil inovasi';
                }
            } else {
                error = 'Terjadi kesalahan tak terduga';
            }
        }
    }

    onMount(async () => {
        loading = true;
        await Promise.all([fetchCategories(), fetchInnovation()]);
        loading = false;
    });

    $: totalInnovations = innovationDaftar.length || categories.reduce((sum, cat) => sum + (cat.jumlah_inovasi || 0),
        0);

    const currentYear = new Date().getFullYear();
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
{:else if categories.length === 0 && innovationDaftar.length === 0}
    <p>Tidak ada data ditemukan.</p>
{:else}
    <div class="row">
        <div class="col-xl-2 col-md-6" title="Total Inovasi">
            <div class="card card-h-100">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-12">
                            <span class="text-muted mb-3 lh-1 d-block text-truncate">Total Inovasi</span>
                            <h4 class="mb-3">
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
                                <h4 class="mb-3">
                                    <span class="counter-value">{category.jumlah_inovasi}</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div id="inovasi" class="row">
    {#each innovationDaftar as innovation}
        <div class="col-xl-4 col-sm-6">
            <div class="card">
                <div class="">
                    <div class="ratio ratio-16x9 img-fluid">
                        <iframe
                            width="560"
                            height="315"
                            src={innovation.link_video_youtube || 'https://www.youtube.com/embed/_ckl62AxFcw?si=LC56HifAHMmffOkO'}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
                <div class="card-body">
                    <p class="text-muted mb-2">Inovasi Tahun {innovation.tahun}</p>
                    <h5><a href="#" class="text-body">{innovation.nama_inovasi}</a></h5>
                    <p class="mb-0 font-size-15">{innovation.rancang_bangun}</p>
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