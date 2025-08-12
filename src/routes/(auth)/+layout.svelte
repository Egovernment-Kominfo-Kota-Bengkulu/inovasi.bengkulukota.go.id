<script lang="ts">
  import { APP_NAME } from "$lib/config";

  let { children } = $props();

  let scripts = [
    '/assets/js/pages/pass-addon.init.js',
  ];

  const currentYear = new Date().getFullYear();
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

<div class="auth-page">
    <div class="container-fluid p-0">
        <div class="row g-0">
            <div class="col-xxl-3 col-lg-4 col-md-5">
                <div class="auth-full-page-content d-flex p-sm-5 p-4">
                    <div class="w-100">
                        <div class="d-flex flex-column h-100">
                            <div class="mb-4 mb-md-5 text-center">
                                <a href="/" class="d-block auth-logo">
                                    <img src="/favicon.png" alt="" height="28"> <span class="logo-txt">{APP_NAME}</span>
                                </a>
                            </div>
                            <div class="auth-content my-auto">
                                <div class="text-center">
                                    <h5 class="mb-0">Selamat Datang Kembali!</h5>
                                    <p class="text-muted mt-2">Masuk untuk melanjutkan ke Inovasi.</p>
                                </div>
                                <main>
                                    {@render children()}
                                </main>
                            </div>
                            <div class="mt-4 mt-md-5 text-center">
                                <p class="mb-0">{currentYear} © Badan Perencanaan Pembangunan Daerah Kota Bengkulu. Dikembangkan oleh <a href="https://kominfo.bengkulukota.go.id/" class="text-decoration-none">Tim EGov Dinas Komunikasi dan Informatika Kota Bengkulu</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end auth full page content -->
            </div>
            <!-- end col -->
            <div class="col-xxl-9 col-lg-8 col-md-7">
                <div class="auth-bg pt-md-5 p-4 d-flex">
                    <div class="bg-overlay bg-primary"></div>
                </div>
            </div>
            <!-- end col -->
        </div>
        <!-- end row -->
    </div>
    <!-- end container fluid -->
</div>