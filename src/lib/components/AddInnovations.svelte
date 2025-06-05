<script lang="ts">
    import { loadScriptsInOrder } from '$lib/utils/scriptLoader';
    import { waitUntil } from '$lib/utils/waitUntil';
    import { onMount } from 'svelte';

    const currentYear = new Date().getFullYear();

    let organizations_id: number = 1;
    let tahun: number = currentYear;
    let nama_inovasi: string = '';
    let link_video_youtube: string = '';
    let latar_belakang: string = '';
    let penjaringan_ide: string = '';
    let pemilihan_ide: string = '';
    let manfaat_inovasi: string = '';
    let dampak_inovasi: string = '';
    let message: string = '';

    async function handleSubmit() {
        if (!nama_inovasi.trim()) {
            message = 'Nama inovasi wajib diisi!';
            return;
        }
        if (!latar_belakang.trim()) {
            message = 'Latar belakang wajib diisi!';
            return;
        }
        if (!penjaringan_ide.trim()) {
            message = 'Penjaringan ide wajib diisi!';
            return;
        }
        if (!pemilihan_ide.trim()) {
            message = 'Pemilihan ide wajib diisi!';
            return;
        }
        if (!manfaat_inovasi.trim()) {
            message = 'Manfaat inovasi wajib diisi!';
            return;
        }
        if (!dampak_inovasi.trim()) {
            message = 'Dampak inovasi wajib diisi!';
            return;
        }
        if (link_video_youtube && !link_video_youtube.startsWith('https://www.youtube.com')) {
            message = 'Link YouTube harus valid!';
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/innovations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    organizations_id,
                    tahun,
                    nama_inovasi,
                    link_video_youtube,
                    latar_belakang,
                    penjaringan_ide,
                    pemilihan_ide,
                    manfaat_inovasi,
                    dampak_inovasi,
                }),
            });

            if (response.ok) {
                message = 'Data berhasil dikirim!';
                // Reset form setelah sukses
                nama_inovasi = '';
                link_video_youtube = '';
                latar_belakang = '';
                penjaringan_ide = '';
                pemilihan_ide = '';
                manfaat_inovasi = '';
                dampak_inovasi = '';
            } else {
               const errorData = await response.json();
                // Tampilkan pesan error spesifik dari server
                if (errorData.errors) {
                const errorMessages = Object.values(errorData.errors)
                    .flat()
                    .join(' ');
                    message = `Gagal mengirim data: ${errorMessages}`;
                } else {
                    message = `Gagal mengirim data: ${response.statusText} (${response.status})`;
                }
            }
        } catch (error: any) {
            message = 'Terjadi kesalahan: ' + error.message;
        }
    }
    
    onMount(async () => {
        // Tunggu sampai jQuery available di window
        await waitUntil(() => typeof window.jQuery !== 'undefined', 1000);

        // Sekarang load DataTables
        await loadScriptsInOrder([
            '/assets/libs/@ckeditor/ckeditor5-build-classic/build/ckeditor.js',
            '/assets/js/pages/form-editor.init.js',
        ]);
    });
</script>

{#if message}
    <div class="alert alert-primary" role="alert">
        {message}
    </div>
{/if}

<form on:submit|preventDefault={handleSubmit}>
    <div class="card card-h-100">
        <div class="card-body">
            <div class="row">   
                <div class="mb-3 col-md-6">
                    <label for="nama_inovasi" class="form-label">Nama Inovasi <span class="text-danger">*</span></label>
                    <input bind:value={nama_inovasi} class="form-control" type="text" placeholder="Masukkan nama inovasi" id="nama_inovasi" required>
                </div>
                <div class="mb-3 col-md-6">
                    <label for="link_video_youtube" class="form-label">Video Youtube Inovasi</label>
                    <input bind:value={link_video_youtube} class="form-control" type="url" placeholder="Masukkan link youtube" id="link_video_youtube">
                </div>
            </div>
        </div>
    </div>

    <div class="card card-h-100">
        <div class="card-header">
            <h4 class="card-title">Rancang Bangun</h4>
        </div>
        <div class="card-body">
            <p class="card-title-desc mb-2">Latar Belakang <span class="text-danger">*</span></p>
            <textarea bind:value={latar_belakang} id="latar_belakangs"></textarea>
        </div>
        <div class="card-body">
            <p class="card-title-desc mb-2">Penjaringan Ide <span class="text-danger">*</span></p>
            <textarea bind:value={penjaringan_ide} id="penjaringan_ides"></textarea>
        </div>
        <div class="card-body">
            <p class="card-title-desc mb-2">Pemilihan Ide <span class="text-danger">*</span></p>
            <textarea bind:value={pemilihan_ide} id="pemilihan_ides"></textarea>
        </div>
        <div class="card-body">
            <p class="card-title-desc mb-2">Manfaat Inovasi <span class="text-danger">*</span></p>
            <textarea bind:value={manfaat_inovasi} id="manfaat_inovasis"></textarea>
        </div>
        <div class="card-body">
            <p class="card-title-desc mb-2">Dampak Inovasi <span class="text-danger">*</span></p>
            <textarea bind:value={dampak_inovasi} id="dampak_inovasis"></textarea>
        </div>  
    </div>
    <div class="d-grid gap-2 mb-3">
        <button type="submit" class="btn btn-primary ">
            <i class="bx bx-save font-size-16 align-middle me-2"></i> Simpan Inovasi
        </button>
    </div>
    
</form>