<script lang="ts">
    import { APP_NAME } from "$lib/config";
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';
    import { getInnovations } from "$lib/api/innovations";
    import type { Innovation } from "$lib/api/innovations";
    import { loadScriptsInOrder } from "$lib/utils/scriptLoader";
    import { waitUntil } from "$lib/utils/waitUntil";

    const innovations : Writable<Innovation[]> = writable([]);
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
        try {
            const data = await getInnovations();
            innovations.set(data);
        } catch (err: any) {
            error = err.message;
        }
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
            <h4 class="mb-sm-0 font-size-18">Semua Pengguna</h4>

            <div class="page-title-right">
                <div>
                    <a href="/admin/users/add" class="btn btn-light"><i class="bx bx-plus me-1"></i> Tambah Pengguna</a>
                </div>
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
                            <th>Organisasi</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Hak Akses</th>
                            <th class="text-center">#</th>
                        </tr>
                        </thead>
                        <tbody>
                            {#each $innovations as innovation (innovation.id)}
                            <tr>
                                <td>{innovation.organization.nama_organisasi}</td>
                                <td></td>
                                <td>{innovation.nama_inovasi}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> <!-- end col -->
</div> <!-- end row -->