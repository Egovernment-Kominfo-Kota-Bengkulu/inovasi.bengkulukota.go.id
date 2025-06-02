<script lang="ts">

    type UserRole = 'admin' | 'operator' | 'organisasi';

    interface MenuItem {
        name: string;
        href: string;
        icon: string;
        translationKey: string;
    }

    type MenuConfig = Record<UserRole, MenuItem[]>;

    const menus: MenuConfig = {
        admin: [
            { name: 'Dashboard', href: '/admin/dashboard', icon: 'home', translationKey: 't-dashboards' },
            { name: 'Inovasi', href: '/admin/innovations', icon: 'anchor', translationKey: 't-innovations' },
            { name: 'Pengumuman', href: '/admin/announcements', icon: 'award', translationKey: 't-announcements' },
            { name: 'Pengguna', href: '/admin/users', icon: 'users', translationKey: 't-users' },
            { name: 'Pengaturan', href: '/admin/settings', icon: 'settings', translationKey: 't-settings' }
        ],
        operator: [
            { name: 'Dashboard', href: '/operator/dashboard', icon: 'home', translationKey: 't-dashboards' },
            { name: 'Inovasi', href: '/operator/innovations', icon: 'lightbulb', translationKey: 't-innovations' },
        ],
        organisasi: [
            { name: 'Rancang Bangun Invoasi', href: '/organisasi/innovations', icon: 'anchor', translationKey: 't-dashboards' },
            { name: 'Riwayat Inovasi', href: '/organisasi/history', icon: 'archive', translationKey: 't-innovations' },
        ]
    } as const;

</script>

<!-- ========== Left Sidebar Start ========== -->
<div class="vertical-menu">

    <div data-simplebar class="h-100">

        <!--- Sidemenu -->
        <div id="sidebar-menu">
            <!-- Left Menu Start -->
            <ul class="metismenu list-unstyled" id="side-menu">
                {#each menus['organisasi'] ?? [] as item}
                <li>
                    <a href="{item.href}">
                        <i data-feather="{item.icon}"></i>
                        <span data-key="{item.translationKey}">{item.name}</span>
                    </a>
                </li>
                {/each}
            </ul>

            <div class="card sidebar-alert border-0 text-center mx-4 mb-0 mt-4">
                <div class="card-body">
                    <img src="/assets/images/innovation.png" alt="">
                    <div class="mt-4">
                        <h5 class="alertcard-title font-size-16">Inovasi</h5>
                        <p class="font-size-13">Kirimkan inovasi Anda: Waktunya berkontribusi dan berkreasi.</p>
                        <a href="#!" class="btn btn-primary mt-2">Tambah Inovasi!</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Sidebar -->
    </div>
</div>
<!-- Left Sidebar End -->