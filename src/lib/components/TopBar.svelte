<script lang="ts">
  import { goto } from "$app/navigation";
  import { APP_NAME } from "$lib/config";

  let searchQuery: string = '';

  function handleSearch(event: Event) {
    event.preventDefault();
    if (searchQuery.trim()) {
        goto(`/search/${encodeURIComponent(searchQuery)}`);
    }
  }
</script>

<header id="page-topbar">
    <div class="navbar-header">
        <div class="d-flex">
            <!-- LOGO -->
            <div class="navbar-brand-box">
                <a href="/" class="logo logo-dark">
                    <span class="logo-sm">
                        <img src="/favicon.png" alt="" height="24">
                    </span>
                    <span class="logo-lg">
                        <img src="/favicon.png" alt="" height="24"> <span class="logo-txt">{APP_NAME}</span>
                    </span>
                </a>

                <a href="/" class="logo logo-light">
                    <span class="logo-sm">
                        <img src="/favicon.png" alt="" height="24">
                    </span>
                    <span class="logo-lg">
                        <img src="/favicon.png" alt="" height="24"> <span class="logo-txt">{APP_NAME}</span>
                    </span>
                </a>
            </div>

            <button type="button" class="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                <i class="fa fa-fw fa-bars"></i>
            </button>
        </div>

        <div class="d-flex">

            <!-- App Search-->
            <form class="app-search d-none d-lg-block me-2" on:submit={handleSearch}>
                <div class="position-relative">
                    <input type="text" class="form-control" placeholder="Temukan inovasi..." bind:value={searchQuery} aria-label="Search" required>
                    <button class="btn btn-primary" type="submit"><i class="bx bx-search-alt align-middle"></i></button>
                </div>
            </form>

            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item right-bar-toggle me-2" disabled>
                    <!-- <i data-feather="settings" class="icon-lg"></i> -->
                </button>
            </div>
            
            <div class="my-3">
                <a href="masuk" class="btn btn-primary btn-rounded waves-effect waves-light px-4"><i data-feather="log-in"></i> Masuk</a>
            </div>

            <!-- <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item bg-light-subtle border-start border-end" id="page-header-user-dropdown"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img class="rounded-circle header-profile-user" src="assets/images/users/avatar-1.jpg"
                        alt="Header Avatar">
                    <span class="d-none d-xl-inline-block ms-1 fw-medium">Shawn L.</span>
                    <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="apps-contacts-profile.html"><i class="mdi mdi mdi-face-man font-size-16 align-middle me-1"></i> Profile</a>
                    <a class="dropdown-item" href="auth-lock-screen.html"><i class="mdi mdi-lock font-size-16 align-middle me-1"></i> Lock screen</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="auth-logout.html"><i class="mdi mdi-logout font-size-16 align-middle me-1"></i> Logout</a>
                </div>
            </div> -->

            <!-- <button type="button" class="btn btn-primary waves-effect waves-light my-3">Masuk / Daftar</button> -->
        </div>
    </div>
</header>