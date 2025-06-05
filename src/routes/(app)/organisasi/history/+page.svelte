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
            '/assets/js/pages/datatables.init.js'
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
            <h4 class="mb-sm-0 font-size-18">Riwayat Inovasi</h4>

            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item active">Riwayat</li>
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
                <h4 class="card-title">Default Datatable</h4>
                <p class="card-title-desc">DataTables has most features enabled by
                    default, so all you need to do to use it with your own tables is to call
                    the construction function: <code>$().DataTable();</code>.
                </p>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="datatable" class="table table-bordered dt-responsive  nowrap w-100">
                        <thead>
                        <tr>
                            <th>Tahun</th>
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
                            {#each $innovations as innovation (innovation.id)}
                            <tr>
                                <td>{innovation.tahun}</td>
                                <td>{innovation.nama_inovasi}</td>
                                <td>{innovation.latar_belakang}</td>
                                <td>{innovation.penjaringan_ide}</td>
                                <td>{innovation.pemilihan_ide}</td>
                                <td>{innovation.manfaat_inovasi}</td>
                                <td>{innovation.dampak_inovasi}</td>
                                <td>{innovation.link_video_youtube}</td>
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