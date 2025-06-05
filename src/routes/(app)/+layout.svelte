<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import VerticalMenu from "$lib/components/VerticalMenu.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import RightBar from "$lib/components/RightBar.svelte";

  import { onMount } from 'svelte';
  import { loadScriptsInOrder } from "$lib/utils/scriptLoader";

  let { children } = $props();
  
  onMount(async () => {
  await loadScriptsInOrder([
    '/assets/libs/jquery/jquery.min.js',
    '/assets/libs/bootstrap/js/bootstrap.bundle.min.js',
    '/assets/libs/metismenu/metisMenu.min.js',
    '/assets/libs/simplebar/simplebar.min.js',
    '/assets/libs/node-waves/waves.min.js',
    '/assets/libs/feather-icons/feather.min.js',
    '/assets/libs/pace-js/pace.min.js',
    '/assets/js/app.js'
  ]);
});
  
</script>

<svelte:head>
    <meta content="Portal resmi inovasi Kota Bengkulu yang menyajikan solusi digital, pelayanan publik, dan program unggulan pemerintah untuk masyarakat." name="description" />
    <meta name="keywords" content="inovasi pemerintah kota bengkulu, program unggulan bengkulu, pelayanan publik digital, smart city bengkulu, aplikasi pemkot bengkulu, inovasi daerah, teknologi untuk masyarakat, pemkot bengkulu, bappeda kota bengkulu, solusi digital pemerintahan">
    
    <!-- preloader css -->
    <link href="/assets/css/preloader.min.css" rel="stylesheet" type="text/css" />
    <!-- Bootstrap Css -->
    <link href="/assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
    <!-- Icons Css -->
    <link href="/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <!-- App Css-->
    <link href="/assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
</svelte:head>

<div id="layout-wrapper">
    <Header />
    <VerticalMenu />

    <div class="main-content">

        <div class="page-content">
            <div class="container-fluid">

                <!-- start page title -->
                <main>
                    {@render children()}
                </main>
                <!-- end page title -->
                
            </div> <!-- container-fluid -->
        </div>
        <!-- End Page-content -->

    </div>
    <!-- end main content-->

    <Footer />
</div>
<!-- END layout-wrapper -->
 
<RightBar />

<!-- Right bar overlay-->
<div class="rightbar-overlay"></div>

<!-- <DynamicScripts />
<DynamicScripts script={scripts} /> -->

