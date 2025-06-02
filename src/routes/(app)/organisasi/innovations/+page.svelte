<script lang="ts">
  import AddInnovations from "$lib/components/AddInnovations.svelte";
  import { APP_NAME } from "$lib/config";
  
  const currentYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>{APP_NAME} | Solusi Digital dan Pelayanan Publik Modern</title>
</svelte:head>

<!-- start page title -->
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Rancang Bangun Inovasi {currentYear}</h4>

            <div class="page-title-right">
                <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="/organisasi/innovations">Rancang Bangun Inovasi</a></li>
                    <li class="breadcrumb-item active">SEPIA (Sistem Elektronik Pegawai Tidak Tetap)</li>
                </ol>
            </div>

        </div>
    </div>
</div>
<!-- end page title -->

<AddInnovations />