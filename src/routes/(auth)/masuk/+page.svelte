<script lang="ts">
  import { APP_NAME } from "$lib/config";
</script>

<svelte:head>
    <title>Masuk {APP_NAME} | Solusi Digital dan Pelayanan Publik Modern</title>
</svelte:head>

<form class="mt-4 pt-2" action="/">
    <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" class="form-control" id="username" placeholder="Masukkan username">
    </div>
    <div class="mb-3">
        <div class="d-flex align-items-start">
            <div class="flex-grow-1">
                <label class="form-label">Kata Sandi</label>
            </div>
            <div class="flex-shrink-0">
                <div class="">
                    <a href="auth-recoverpw.html" class="text-muted">Lupa kata sandi?</a>
                </div>
            </div>
        </div>
        
        <div class="input-group auth-pass-inputgroup">
            <input type="password" class="form-control" placeholder="Masukkan kata sandi" aria-label="Password" aria-describedby="password-addon">
            <button class="btn btn-light shadow-none ms-0" type="button" id="password-addon"><i class="mdi mdi-eye-outline"></i></button>
        </div>
    </div>
    <div class="row mb-4">
        <div class="col">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="remember-check">
                <label class="form-check-label" for="remember-check">
                    Ingatkan saya
                </label>
            </div>  
        </div>
        
    </div>
    <div class="mb-3">
        <button class="btn btn-primary w-100 waves-effect waves-light" type="submit">Log In</button>
    </div>
</form>