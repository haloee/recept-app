<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import NavBar from '$lib/components/NavBar.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<NavBar />

<slot />

<Footer />