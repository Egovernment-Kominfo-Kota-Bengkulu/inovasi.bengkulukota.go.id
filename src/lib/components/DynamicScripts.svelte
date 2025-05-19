<script lang="ts">
    import { onMount } from "svelte";

    export let script = [
        '/assets/libs/jquery/jquery.min.js',
        '/assets/libs/bootstrap/js/bootstrap.bundle.min.js',
        '/assets/libs/metismenu/metisMenu.min.js',
        '/assets/libs/simplebar/simplebar.min.js',
        '/assets/libs/node-waves/waves.min.js',
        '/assets/libs/feather-icons/feather.min.js',
        '/assets/libs/pace-js/pace.min.js',
        '/assets/js/app.js'
  ];

  onMount (() => {
    script.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    });
  })
</script>