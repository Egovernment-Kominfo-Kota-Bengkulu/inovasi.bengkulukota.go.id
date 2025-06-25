<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';
    import { getInnovations } from "$lib/api/innovations";
    import type { Innovation } from "$lib/api/innovations";

    export let data: {
        error?: Error; // Optional Error type for data.error
        data?: { jumlah_inovasi?: number }; // Optional nested data object
    };

    onMount(async () => {
        try {
            const response = await fetch('https://inovasibackend.bengkulukota.go.id/api/stats/innovation');
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari API');
        }
            data = await response.json();
        } catch (err: any) {
            data.error = err.message;
        }
    });

    // Definisikan tipe untuk data kategori
    interface Category {
        nama_kategori: string;
        jumlah_inovasi: number;
    }

    // Definisikan tipe untuk categories sebagai array dari Category
    let categories: Category[] = [];
    let error: string | null = null;
    let loading: boolean = true;

    async function fetchCategories() {
        try {
        const response = await fetch('https://inovasibackend.bengkulukota.go.id/api/stats/innovation/category');
        if (!response.ok) {
            throw new Error('Gagal mengambil data dari API');
        }
        const data = await response.json();
        categories = data.data; // Ambil array dari properti 'data'
        } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';
        } finally {
        loading = false;
        }
    }

    onMount(fetchCategories);

    const innovations : Writable<Innovation[]> = writable([]);
    let errorr: string = '';

    onMount(async () => {
        try {
            const data = await getInnovations();
            innovations.set(data);
        } catch (err: any) {
            errorr = err.message;
        }
    });

    const currentYear = new Date().getFullYear();
</script>

<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Inovasi untuk kota Bengkulu Lebih Baik</h4>

            <div class="page-title-right">
                <p class="text-muted mb-0">Temukan program unggulan dan solusi digital dari Pemerintah Kota Bengkulu</p>
            </div>

        </div>
    </div>
</div>
    {#if loading}
        <p>Memuat data...</p>
    {:else if error}
        <p style="color: red;">Error: {error}</p>
    {:else if categories.length === 0}
        <p>Tidak ada data kategori ditemukan.</p>
    {:else}
        <div class="row">
            {#if data.error}
        <p style="color: red;">Error: {data.error.message}</p>
    {:else if data.data?.jumlah_inovasi}
        <!-- Card component for displaying Total Inovasi -->
        <div class="col-xl-2 col-md-6" title="Total Inovasi">
            <div class="card card-h-100">
            <div class="card-body">
                <div class="row align-items-center">
                <div class="col-12">
                    <span class="text-muted mb-3 lh-1 d-block text-truncate">Total Inovasi</span>
                    <h4 class="mb-3">
                    <span class="counter-value" data-target="{data.data.jumlah_inovasi}">{data.data.jumlah_inovasi}</span>
                    </h4>
                </div>
                </div>
            </div>
            </div>
        </div>
    {:else}
        <p>Sedang memuat data atau data tidak tersedia...</p>
    {/if}
        {#each categories as category}
            <div
            class="col-xl-2 col-md-6"
            title={category.nama_kategori === 'Perangkat Daerah'
                ? 'Perangkat Daerah, Kecamatan, RSHD, RSTG dan Perumda Tirta Hidayah'
                : category.nama_kategori}
            >
            <!-- card -->
            <div class="card card-h-100">
                <!-- card body -->
                <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-12">
                    <span class="text-muted mb-3 lh-1 d-block text-truncate">{category.nama_kategori}</span>
                    <h4 class="mb-3">
                        <span class="counter-value">{category.jumlah_inovasi}</span>
                    </h4>
                    </div>
                </div>
                </div><!-- end card body -->
            </div><!-- end card -->
            </div><!-- end col-->
        {/each}
        </div><!-- end row -->
    {/if}

<div id="inovasi" class="row">
    {#each $innovations as innovation (innovation.id)}
    <div class="col-xl-4 col-sm-6">
        <div class="card">
            <div class="">
                <div class="ratio ratio-16x9 img-fluid">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/_ckl62AxFcw?si=LC56HifAHMmffOkO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
            <div class="card-body">
                <p class="text-muted mb-2">Inovasi Tahun {innovation.tahun}</p>
                <h5 class=""><a href="#" class="text-body">{innovation.nama_inovasi}</a></h5>
                <p class="mb-0 font-size-15">{innovation.latar_belakang}</p>
                <div class="mt-3">
                    <a href="#" class="align-middle font-size-15">Lihat detailnya <i class="mdi mdi-chevron-right"></i></a>
                </div>
            </div>
        </div>
        <!-- end card -->
    </div>
    <!-- end col -->     
    {/each}                     
</div>
<!-- end row -->

<div class="row justify-content-center mb-4">
    <div class="col-md-3">
        <div class="">
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
<!-- end row -->