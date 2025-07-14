<script lang="ts">
    import { APP_NAME } from "$lib/config";
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';
    import { loadScriptsInOrder } from "$lib/utils/scriptLoader";
    import { waitUntil } from "$lib/utils/waitUntil";

    let error: string = '';

    onMount(async () => {
        // Tunggu sampai jQuery available di window
        await waitUntil(() => typeof window.jQuery !== 'undefined', 1000);

        // Sekarang load DataTables
        await loadScriptsInOrder([
            '/assets/libs/datatables.net/js/jquery.dataTables.min.js',
            '/assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
            '/assets/js/pages/datatables.init.js',
        ]);
    });

    onMount(async () => {
    });
</script>

<svelte:head>
    <title>{APP_NAME} | Solusi Digital dan Pelayanan Publik Modern</title>
    <link href="/assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/libs/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
</svelte:head>

<!-- start page title -->
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Semua Pengumuman</h4>

            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item active">Pengumuman</li>
                </ol>
            </div>

        </div>
    </div>
</div>
<!-- end page title -->

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Tabel Semua Data Inovasi</h4>
                <p class="card-title-desc">
                    Tabel lengkap berisi seluruh data inovasi yang telah dikembangkan di Kota Bengkulu untuk mendukung pelayanan publik dan pembangunan daerah.
                </p>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="datatable" class="table table-bordered dt-responsive  nowrap w-100">
                        <thead>
                        <tr>
                            <th>Tahun</th>
                            <th>Organisasi</th>
                            <th>Nama</th>
                            <th>Latar Belakang</th>
                            <th>Penjaringan Ide</th>
                            <th>Pemilihan Ide</th>
                            <th>Manfaat Inovasi</th>
                            <th>Dampak Inovasi</th>
                            <th>Video Youtube</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> <!-- end col -->
</div> <!-- end row -->