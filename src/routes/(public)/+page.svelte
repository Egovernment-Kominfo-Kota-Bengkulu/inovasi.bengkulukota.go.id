<script lang="ts">
    import api from '$lib/api/index';
    import PlaceholdersIndex from '$lib/components/PlaceholdersIndex.svelte';
    import type { Innovation } from '$lib/types/innovation';
    import type { Category } from '$lib/types/category';
    import type { PaginatedResponse } from '$lib/types/pagination';
    import { handleAxiosError } from '$lib/utils/errorHandler';
    import { onMount } from 'svelte';

    let totalInnovations: number = 0;
    let categories: Category[] = [];
    let innovations: Innovation[] = [];
    let currentPage: number = 1;
    let lastPage: number = 1;
    let links: PaginatedResponse['data']['links'] = [];
    let loading: boolean = true;
    let error: string | null = null;

    async function fetchCategoriesCount() {
        try {
            const response = await api.get('/stats/innovation/');
            console.log('Response kategori count:', response.data.data.jumlah_inovasi);
            totalInnovations = response.data.data.jumlah_inovasi;
        } catch (err) {
            console.error('Gagal mengambil jumlah inovasi:', err);
            error = handleAxiosError(err, 'Gagal mengambil jumlah inovasi');
        }
    }

    async function fetchCategories() {
        try {
            const response = await api.get('/stats/innovation/category');
            console.log('Response kategori:', response.data.data);
            categories = response.data.data;
        } catch (err) {
            console.error('Gagal mengambil kategori:', err);
            error = handleAxiosError(err, 'Gagal mengambil kategori');
        }
    }

    async function fetchInnovation(page: number = 1) {
        try {
            console.log(`Fetching innovations for page: ${page}`); // Debug log
            const response = await api.get<PaginatedResponse>(`/innovations?page=${page}`);
            console.log('Response inovasi:', response.data.data.data); // Debug log
            innovations = response.data.data.data; // Update innovations
            currentPage = response.data.data.current_page;
            lastPage = response.data.data.last_page;
            links = response.data.data.links;
        } catch (err) {
            console.error('Gagal mengambil inovasi:', err);
            error = handleAxiosError(err, 'Gagal mengambil inovasi');
        } finally {
            loading = false;
        }
    }

    onMount(async () => {
        loading = true;
        await Promise.all([fetchCategories(), fetchInnovation(), fetchCategoriesCount()]);
        loading = false;
    });

    async function handlePageChange(url: string | null) {
        if (!url) {
            console.log('No URL provided for pagination');
            return;
        }
        const page = new URL(url).searchParams.get('page');
        if (page) {
            console.log(`Navigating to page: ${page}`); // Debug log
            loading = true; // Show loading state during page change
            await fetchInnovation(parseInt(page));
        } else {
            console.error('Page number not found in URL:', url);
        }
    }
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
    <PlaceholdersIndex />
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

<section id="tentang" class="my-5">
    <div class="row">
        <div class="col-md-6">
            <img class="rounded me-2 img-fluid" alt="Kepala Daerah Kota Bengkulu" src="assets/images/kepala_daerah_kota_bengkulu.png" data-holder-rendered="true">
        </div>
        <div class="col-md-6">
            <h1 class="mb-3">Ayo Tunjukkan Kreativitas dan Inovasimu!</h1>
            <p class="lead">
                Lomba Inovasi Daerah 2025 menjadi ajang apresiasi bagi ide-ide segar dan solusi nyata dari perangkat daerah, kecamatan, kelurahan, sekolah, puskesmas, dan unit kerja lainnya.
            </p>
            <p class="mb-0">
                Saatnya berkarya, berinovasi, dan berdampak! Raih hadiah menarik, penghargaan bergengsi, serta kesempatan mengikuti <strong>Innovative Government Award (IGA) Kemendagri 2025</strong>.
            </p>
            <p>
                Bersama kita wujudkan <strong>Bengkulu yang Inovatif, Kreatif, dan Kompetitif.</strong>
            </p>
            <a href="#panduan" class="btn btn-primary">
                Panduan Inovasi Daerah
                <i class="mdi mdi-chevron-right"></i>
            </a>
        </div>
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
<section id="panduan" class="my-5">
    <div class="row">
        <div class="col-md-4">
            <img class="rounded me-2 img-fluid" alt="Kepala Daerah Kota Bengkulu" src="assets/images/inovasi.jpeg" data-holder-rendered="true">
        </div>
        <div class="col-md-8">
            <h2 class="mb-3">📥 Unduh Pedoman Lomba Inovasi Daerah 2025</h2>
            <p class="mb-2">
                Pelajari seluruh ketentuan, tahapan, dan panduan lengkap lomba inovasi.  
                Siapkan inovasimu dan raih kesempatan mengikuti IGA Kemendagri 2025!
            </p>
            <p class="mb-4">
                Klik tombol di bawah ini untuk mendapatkan Buku Pedoman Resmi.
            </p>
            <a href="/pedoman_inovasi_inovasi_2025.pdf" class="btn btn-success" download>
                📄 Download Pedoman Sekarang
            </a>
        </div>
    </div>
</section>
<section id="kontak" class="my-5 p-4 bg-light">
    <h2 class="mb-3">Hubungi Kami</h2>
    <p>
        Jika ada pertanyaan, informasi lebih lanjut, atau pendampingan inovasi,  
        silakan hubungi kami melalui kontak berikut:
    </p>
    <ul class="list-unstyled">
        <li><strong>Badan Perencanaan Pembangunan Daerah Kota Bengkulu – Bidang Penelitian dan Pengembangan</strong></li>
        <li>Bentiring Permai, Kec. Muara Bangka Hulu, Kota Bengkulu, Bengkulu 38119</li>
        <li>☎️ (0736) 123456 | 📱 WhatsApp: 08xx-xxxx-xxxx</li>
        <li>📧 bappeda@bengkulukota.go.id</li>
        <li>🕑 Senin – Jumat | 08.00 – 16.00 WIB</li>
    </ul>
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