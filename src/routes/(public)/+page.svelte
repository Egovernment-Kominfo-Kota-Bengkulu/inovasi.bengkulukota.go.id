<script lang="ts">
    import api from '$lib/api/index';
    import {
        handleAxiosError
    } from '$lib/utils/errorHandler';
    import type {
        Innovation
    } from '$lib/types/innovation';
    import type {
        Category
    } from '$lib/types/category';
    import {
        onMount
    } from 'svelte';

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
    <section id="inovasi" class="my-4">
        <div class="row">
            <div class="col-12">
                <h5 class="mb-3"><i data-feather="award"></i> Inovasi Terbaru</h5>
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
                        <p class="text-muted text-truncate d-inline-block w-100 mb-0">{innovation.organization.nama_organisasi} </p>
                        <h5 class="text-truncate d-inline-block w-100 mb-0"><a href="#" class="text-body text-truncate d-inline-block w-100">{innovation.nama_inovasi}</a></h5>
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
    </section>
{/if}

<section id="tentang">
    <div class="text-center">
        <h3 class="mt-5">Ayo tunjukkan kreativitas dan inovasimu untuk kemajuan Kota Bengkulu!</h3>
        <p class="font-size-16">Lomba Inovasi Daerah 2025 adalah wadah bagi perangkat daerah, kecamatan, kelurahan, sekolah, puskesmas, dan unit kerja lainnya untuk menampilkan inovasi terbaiknya. Pemenang akan berkesempatan mengikuti Penilaian Indeks Inovasi Daerah (IGA) Kemendagri 2025.</p>
    </div>
</section>

<section id="jadwalpelaksanaan" class="my-5">
    <div class="row justify-content-center">
        <div class="col-xl-10">
            <div class="timeline">
                <div class="timeline-container">
                    <div class="timeline-end">
                        <p class="pt-3">Jadwal 2025</p>
                    </div>
                    <div class="timeline-continue">
                        <div class="row timeline-right">
                            <div class="col-md-6">
                                <div class="timeline-icon">
                                    <i class="bx bx-group text-primary h2 mb-0"></i>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">Februari 2025</h3>
                                            <p class="mb-0 mt-2 pt-1 text-muted">Rapat Koordinasi Tim Fasilitasi Inovasi Daerah dan Tim Pelaksana Lomba Inovasi</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row timeline-left">
                            <div class="col-md-6 d-md-none d-block">
                                <div class="timeline-icon">
                                    <i class="bx bx-broadcast text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">Februari-Maret 2025</h3>
                                            <p class="mb-0 mt-2 pt-1 text-muted">Rapat Sosialisasi Lomba Inovasi Daerah dan Penilaian Indeks Inovasi Daerah Penghargaan Innovative Government Award/ IGA Kemendagri Tahun 2025 untuk Kepala Perangkat Daerah, Kepala Unit Kerja, Camat, Lurah dan kepala Sekolah di Lingkungan Pemerintah Kota Bengkulu</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="col-md-6 d-md-block d-none">
                                <div class="timeline-icon">
                                    <i class="bx bx-broadcast text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                        </div>

                        <div class="row timeline-right">
                            <div class="col-md-6">
                                <div class="timeline-icon">
                                    <i class="bx bx-edit text-primary h2 mb-0"></i>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">Maret-Juni 2025</h3>
                                            <p class="mb-0 mt-2 pt-1 text-muted">Pendampingan dan pengisian indikator oleh perangkat daerah dan unit kerja ke dalam aplikasi IGA Kemendagri</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row timeline-left">
                            <div class="col-md-6 d-md-none d-block">
                                <div class="timeline-icon">
                                    <i class="bx bx-conversation text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">April-Mei 2025</h3>
                                            <p class="mb-0 mt-2 pt-1 text-muted">Rapat Koordinasi Tim Pelaksana Lomba Inovasi Daerah dan Tim Pembahas Lomba Inovasi Daerah bagi Perangkat Daerah Tahun 2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 d-md-block d-none">
                                <div class="timeline-icon">
                                    <i class="bx bx-conversation text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                        </div>

                        <div class="row timeline-right">
                            <div class="col-md-6">
                                <div class="timeline-icon">
                                    <i class="bx bx-award text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">Mei-Juni 2025</h3>

                                            <p class="mb-0 mt-2 pt-1 text-muted">Penilaian Lomba Inovasi Daerah</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row timeline-left">
                            <div class="col-md-6 d-md-none d-block">
                                <div class="timeline-icon">
                                    <i class="bx bx-bell text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">Juni 2025</h3>
                                            <p class="mb-0 mt-2 pt-1 text-muted">Pengumuman Nominasi Lomba Inovasi Daerah sesuai kategori</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="col-md-6 d-md-block d-none">
                                <div class="timeline-icon">
                                    <i class="bx bx-bell text-primary h2 mb-0"></i>
                                </div>
                            </div>
                        </div>

                        <div class="row timeline-right">
                            <div class="col-md-6">
                                <div class="timeline-icon">
                                    <i class="bx bx-briefcase-alt text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">Juni 2025</h3>

                                            <p class="mb-0 mt-2 pt-1 text-muted">Presentasi Kepala Perangkat Daerah yang masuk 6 Besar Lomba Inovasi Daerah Terbaik sesuai dengan kategori dan Verifikasi ke Lapangan oleh Tim Pembahas Lomba Inovasi Daerah</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row timeline-left">
                            <div class="col-md-6 d-md-none d-block">
                                <div class="timeline-icon">
                                    <i class="bx bx-trophy text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">Juli 2025</h3>
                                            <p class="mb-0 mt-2 pt-1 text-muted">Pengumuman Pemenang Lomba Inovasi Daerah Kota Bengkulu Juara I, II, III dan Harapan I, II, III sesuai dengan kategori</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="col-md-6 d-md-block d-none">
                                <div class="timeline-icon">
                                    <i class="bx bx-trophy text-primary h2 mb-0"></i>
                                </div>
                            </div>
                        </div>

                        <div class="row timeline-right">
                            <div class="col-md-6">
                                <div class="timeline-icon">
                                    <i class="bx bx-send text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">Juli-Agustus 2025</h3>

                                            <p class="mb-0 mt-2 pt-1 text-muted">Pengiriman Inovasi Perangkat Daerah dari sub menu lomba inovasi pemerintah daerah ke sub menu inovasi daerah dalam aplikasi IGA Kemendagri</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row timeline-left">
                            <div class="col-md-6 d-md-none d-block">
                                <div class="timeline-icon">
                                    <i class="bx bx-user-voice text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">September-Oktober 2025</h3>
                                            <p class="mb-0 mt-2 pt-1 text-muted">Presentasi Kepala Daerah dilanjutkan dengan Verifikasi Lapangan </p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="col-md-6 d-md-block d-none">
                                <div class="timeline-icon">
                                    <i class="bx bx-user-voice text-primary h2 mb-0"></i>
                                </div>
                            </div>
                        </div>

                        <div class="row timeline-right">
                            <div class="col-md-6">
                                <div class="timeline-icon">
                                    <i class="bx bx-news text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">November 2025</h3>

                                            <p class="mb-0 mt-2 pt-1 text-muted">Pengumuman hasil penilaian Indeks Inovasi Daerah/ Innovative Government Award (IGA) dari Kemendagri</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row timeline-left">
                            <div class="col-md-6 d-md-none d-block">
                                <div class="timeline-icon">
                                    <i class="bx bx-medal text-primary h2 mb-0"></i>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="timeline-box">
                                    <div class="event-content">
                                        <div class="timeline-text">
                                            <h3 class="font-size-18">Desember 2025</h3>
                                            <p class="mb-0 mt-2 pt-1 text-muted">Pemberian penganugerahan Innovative Government Award (IGA) Kemendagri 2025</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="col-md-6 d-md-block d-none">
                                <div class="timeline-icon">
                                    <i class="bx bx-medal text-primary h2 mb-0"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-start">
                        <p>Selesai</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

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