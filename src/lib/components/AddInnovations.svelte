<script lang="ts">
    import { onMount } from 'svelte';
    
    const scripts = [
    '/assets/libs/@ckeditor/ckeditor5-build-classic/build/ckeditor.js',
    '/assets/js/pages/form-editor.init.js'
    ];

    onMount(() => {
        const loadedScripts: HTMLScriptElement[] = [];

        scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false; // Muat berurutan untuk dependensi
        script.onload = () => console.log(`${src} loaded`);
        document.body.appendChild(script);
        loadedScripts.push(script);
        });

        // Cleanup saat halaman di-unmount
        return () => {
        loadedScripts.forEach(script => {
            if (document.body.contains(script)) {
            document.body.removeChild(script);
            }
        });
        };
    });
</script>

<div class="card card-h-100">
    <div class="card-body">
        <div class="row">   
            <div class="mb-3 col-md-6">
                <label for="nama-inovasi" class="form-label">Nama Inovasi <span class="text-danger">*</span></label>
                <input class="form-control" type="text" placeholder="Masukkan nama inovasi" id="nama-inovasi" required>
            </div>
            <div class="mb-3 col-md-6">
                <label for="nama-inovasi" class="form-label">Video Youtube Inovasi</label>
                <input class="form-control" type="url" placeholder="Masukkan link youtube" id="nama-inovasi">
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
        <div id="latar-belakang"></div>
    </div>
    <div class="card-body">
        <p class="card-title-desc mb-2">Penjaringan Ide <span class="text-danger">*</span></p>
        <div id="penjaringan-ide"></div>
    </div>
    <div class="card-body">
        <p class="card-title-desc mb-2">Pemilihan Ide <span class="text-danger">*</span></p>
        <div id="pemilihan-ide"></div>
    </div>
    <div class="card-body">
        <p class="card-title-desc mb-2">Manfaat Inovasi <span class="text-danger">*</span></p>
        <div id="manfaat-inovasi"></div>
    </div>
    <div class="card-body">
        <p class="card-title-desc mb-2">Dampak Inovasi <span class="text-danger">*</span></p>
        <div id="dampak-inovasi"></div>
    </div>  
</div>