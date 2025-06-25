<script lang="ts">
  import { APP_NAME } from "$lib/config";
  import { onMount } from "svelte";

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
</script>

<svelte:head>
    <title>{APP_NAME} | Solusi Digital dan Pelayanan Publik Modern</title>
</svelte:head>

<!-- start page title -->
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Dasbor</h4>

            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="javascript: void(0);">Dashboard</a></li>
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
            </div>

        </div>
    </div>
</div>
<!-- end page title -->
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

<div class="row">
    <div class="col-xl-6">
        <!-- card -->
        <div class="card card-h-100">
            <!-- card body -->
            <div class="card-body">
                <div class="d-flex flex-wrap align-items-center mb-1">
                    <h5 class="card-title me-2">Pemanang Lomba Inovasi</h5>
                    <div class="hstack gap-3">
                        <div class="my-3">
                            <button type="button" class="btn btn-soft-primary btn-sm mb-1">
                                Perangkat Daerah
                            </button>
                            <button type="button" class="btn btn-soft-secondary btn-sm mb-1">
                                Kelurahan
                            </button>
                            <button type="button" class="btn btn-soft-secondary btn-sm mb-1">
                                Puskesmas
                            </button>
                            <button type="button" class="btn btn-soft-secondary btn-sm mb-1">
                                Sekolah Menengah Pertama
                            </button>
                            <button type="button" class="btn btn-soft-secondary btn-sm mb-1">
                                Sekolah Dasar
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row align-items-center">
                    <div class="col-sm align-self-center">
                        <div class="mt-4 mt-sm-0">
                            <div>
                                <div class="mb-2 text-uppercase text-success fw-bold"><i class="mdi mdi-circle align-middle font-size-10 me-2"></i>Juara I
                                <span class="text-black">Dinas Komunikasi dan Informatika</span><p class="text-muted font-size-14 fw-normal">"SEPIA" (Sistem Elektronik Pegawai Tidak Tetap)</p>
                                </div>
                            </div>

                            <div class="mt-1 pt-1">
                                <div class="mb-2 text-uppercase text-success fw-bold"><i class="mdi mdi-circle align-middle font-size-10 me-2"></i>Juara II
                                <span class="text-black">Dinas Pelayanan Terpadu Satu Pintu</span><p class="text-muted font-size-14 fw-normal">"SIAP Cepat" (Sistem Informasi Administrasi Perizinan Cepat)</p>
                                </div>
                            </div>

                            <div class="mt-1 pt-1">
                                <div class="mb-2 text-uppercase text-success fw-bold"><i class="mdi mdi-circle align-middle font-size-10 me-2"></i>Juara III
                                <span class="text-black">Dinas Pemberdayaan Perempuan dan Perlindungan Anak</span><p class="text-muted font-size-14 fw-normal">"SPPA" (Sahabat Perempuan dan Anak)</p>
                                </div>
                            </div>
                            <div class="mt-1 pt-1">
                                <div class="mb-2 text-uppercase text-success fw-bold"><i class="mdi mdi-circle align-middle font-size-10 me-2"></i>Harapan I
                                <span class="text-black">Dinas Ketahanan Pangan dan Pertanian</span><p class="text-muted font-size-14 fw-normal">"AgriConnect" (Konektivitas Pertanian Digital)</p>
                                </div>
                            </div>

                            <div class="mt-1 pt-1">
                                <div class="mb-2 text-uppercase text-success fw-bold"><i class="mdi mdi-circle align-middle font-size-10 me-2"></i>Harapan II
                                <span class="text-black">Dinas Kebudayaan dan Pariwisata</span><p class="text-muted font-size-14 fw-normal">"Pesona Lokal" (Platform Promosi Pariwisata Berbasis Komunitas)</p>
                                </div>
                            </div>

                            <div class="mt-1 pt-1">
                                <div class="mb-2 text-uppercase text-success fw-bold"><i class="mdi mdi-circle align-middle font-size-10 me-2"></i>Harapan III
                                <span class="text-black">Dinas Sosial</span><p class="text-muted font-size-14 fw-normal"> "Pilar Kesejahteraan" (Sistem Integrasi Data Penerima Bantuan Sosial)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end card -->
    </div>
    <!-- end col -->
    <div class="col-xl-6">
        <!-- card -->
        <div class="card bg-primary text-white shadow-primary card-h-100">
            <!-- card body -->
            <div class="card-body p-0">
                <div id="carouselExampleCaptions" class="carousel slide text-center widget-carousel" data-bs-ride="carousel">                                                   
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="text-center p-3">
                                <div class="ratio ratio-16x9">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/_ckl62AxFcw?si=LC56HifAHMmffOkO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </div>
                                <h4 class="mt-3 lh-base fw-normal text-white"><b>Bitcoin</b> News</h4>
                                <p class="text-white-50 font-size-13">Bitcoin prices fell sharply amid the global sell-off in equities. Negative news
                                    over the Bitcoin past week has dampened Bitcoin basics
                                    sentiment for bitcoin. </p>
                                <button type="button" class="btn btn-light btn-sm">Lihat detailnya <i class="mdi mdi-arrow-right ms-1"></i></button>
                            </div>
                        </div>
                        <!-- end carousel-item -->
                        <div class="carousel-item">
                            <div class="text-center p-3">
                                <div class="ratio ratio-16x9">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/_ckl62AxFcw?si=LC56HifAHMmffOkO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </div>
                                <h4 class="mt-3 lh-base fw-normal text-white"><b>ETH</b> News</h4>
                                <p class="text-white-50 font-size-13">Bitcoin prices fell sharply amid the global sell-off in equities. Negative news
                                    over the Bitcoin past week has dampened Bitcoin basics
                                    sentiment for bitcoin. </p>
                                <button type="button" class="btn btn-light btn-sm">Lihat detailnya <i class="mdi mdi-arrow-right ms-1"></i></button>
                            </div>
                        </div>
                        <!-- end carousel-item -->
                        <div class="carousel-item">
                            <div class="text-center p-3">
                                <div class="ratio ratio-16x9">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/_ckl62AxFcw?si=LC56HifAHMmffOkO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </div>
                                <h4 class="mt-3 lh-base fw-normal text-white"><b>Litecoin</b> News</h4>
                                <p class="text-white-50 font-size-13">Bitcoin prices fell sharply amid the global sell-off in equities. Negative news
                                    over the Bitcoin past week has dampened Bitcoin basics
                                    sentiment for bitcoin. </p>
                                <button type="button" class="btn btn-light btn-sm">Lihat detailnya <i class="mdi mdi-arrow-right ms-1"></i></button>
                            </div>
                        </div>
                        <!-- end carousel-item -->
                    </div>
                    <!-- end carousel-inner -->
                    
                    <div class="carousel-indicators carousel-indicators-rounded">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <!-- end carousel-indicators -->
                </div>
                <!-- end carousel -->
            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->
    </div>
    <!-- end col -->
</div> <!-- end row-->