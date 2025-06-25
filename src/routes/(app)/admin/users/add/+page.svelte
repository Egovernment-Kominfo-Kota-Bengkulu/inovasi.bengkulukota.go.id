<script lang="ts">
    import { onMount } from 'svelte';

    let organizations_id: string = '';
    let name: string = '';
    let email: string = '';
    let password: string = '';
    let access: string = '';
    let message: string = '';

    async function handleSubmit() {
        console.log('Tombol submit diklik', { organizations_id, name, email, password, access });
        try {
            const response = await fetch('https://inovasibackend.bengkulukota.go.id/api/innovations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    organizations_id: Number(organizations_id),
                    name,
                    email,
                    password,
                    access,
                }),
            });

            if (response.ok) {
                message = 'Data berhasil dikirim!';
                // Reset form setelah sukses
                organizations_id = '';
                name = '';
                email = '';
                password = '';
                access = '';
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

interface Organization {
    id: number;
    nama_organisasi: string;
  }

  // Define the API response structure
  interface ApiResponse {
    status: string;
    message: string;
    data: {
      current_page: number;
      data: Organization[];
    };
  }

  // Explicitly type the variables
  let organizations: Organization[] = [];
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await fetch('https://inovasibackend.bengkulukota.go.id/api/organizations');
      if (!response.ok) throw new Error('Failed to fetch organizations');
      const apiResponse: ApiResponse = await response.json();
      organizations = apiResponse.data.data; // Extract the nested data array
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
    }
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
                <div class="mb-3 col-md-12">
                    <label for="organisasi" class="form-label">Organisasi <span class="text-danger">*</span></label>
                    <select bind:value={organizations_id} class="form-select" aria-label="Default select example" required>
                    <option value="" disabled selected>Pilih organisasi</option>
                        {#if error}
                            <option value={null} disabled>Error: {error}</option>
                        {:else if organizations.length}
                            {#each organizations as org (org.id)}
                            <option value={org.id}>{org.nama_organisasi}</option>
                            {/each}
                        {:else}
                            <option value={null} disabled>Loading organizations...</option>
                        {/if}
                    </select>
                </div> 
                <div class="mb-3 col-md-6">
                    <label for="nama" class="form-label">Nama <span class="text-danger">*</span></label>
                    <input bind:value={name} class="form-control" type="text" placeholder="Masukkan nama pengguna" id="nama" required>
                </div>
                <div class="mb-3 col-md-6">
                    <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                    <input bind:value={email} class="form-control" type="email" placeholder="Masukkan email pengguna" id="email" required>
                </div>
                <div class="mb-3 col-md-6">
                    <label for="kata_sandi" class="form-label">Kata Sandi <span class="text-danger">*</span></label>
                    <input bind:value={password} class="form-control" type="password" placeholder="Masukkan kata sandi pengguna" id="kata_sandi" required>
                </div>
                <div class="mb-3 col-md-6">
                    <label for="hak_akses" class="form-label">Hak Akses<span class="text-danger">*</span></label>
                    <select bind:value={access} class="form-select" id="hak_akses" required>
                        <option value="" disabled selected>Pilih Akses</option>
                        <option value="admin">Admin</option>
                        <option value="operator">Operator</option>
                        <option value="organisasi">Organisasi</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="d-grid gap-2 mb-3">
        <button type="submit" class="btn btn-primary ">
            <i class="bx bx-save font-size-16 align-middle me-2"></i> Simpan Pengguna
        </button>
    </div>
</form>