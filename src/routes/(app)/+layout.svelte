<script lang="ts">
  import DynamicScript from "$lib/components/DynamicScripts.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import RightBar from "$lib/components/RightBar.svelte";
  import VerticalMenu from "$lib/components/VerticalMenu.svelte";
  let { children } = $props();
//   import { onMount } from 'svelte';
//   onMount(() => {
//     if (window.feather) window.feather.replace();
//   });
</script>

<svelte:head>
    <title>Inovasi Pemerintah Kota Bengkulu | Solusi Digital dan Pelayanan Publik Modern</title>
    <meta content="Portal resmi inovasi Kota Bengkulu yang menyajikan solusi digital, pelayanan publik, dan program unggulan pemerintah untuk masyarakat." name="description" />
    <meta name="keywords" content="inovasi pemerintah kota bengkulu, program unggulan bengkulu, pelayanan publik digital, smart city bengkulu, aplikasi pemkot bengkulu, inovasi daerah, teknologi untuk masyarakat, pemkot bengkulu, bappeda kota bengkulu, solusi digital pemerintahan">

    <!-- preloader css -->
    <link rel="stylesheet" href="assets/css/preloader.min.css" type="text/css" />
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
    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
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

<DynamicScript />

