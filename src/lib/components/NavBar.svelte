<script>
  import { onMount } from 'svelte';

  let links = [
    { name: "Home", href: "/" },
    { name: "Népszerű Receptek", href: "/popular" },
    { name: "Receptkereső", href: "/recipes" },
    { name: "Bevásárlólist", href: "/shopping-list" }
  ];

  onMount(async () => {
    await import('bootstrap/dist/js/bootstrap.bundle.min.js');
  });
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">Recept App</a>
    <button 
      class="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav"
      aria-label="Menü megnyitása"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        {#each links as link}
          <li class="nav-item">
            <a class="nav-link fw-semibold" href={link.href}>{link.name}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>

<style>
  /*  Megakadályozzuk a navbar elemek összecsúszását és változását */
  .navbar {
    min-height: 60px;
    padding: 0.75rem 1rem;
    transition: all 0.3s ease-in-out;
  }

  .navbar-brand {
    font-size: 1.5rem;
  }

  .navbar-toggler {
    border: none;
    outline: none;
    box-shadow: none;
  }

  /*  Linkek stílusa, fix méretek */
  .navbar-nav .nav-link {
    font-size: 1rem;
    padding: 10px 15px;
    color: white !important;
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    display: inline-block;
    transition: background 0.3s ease-in-out;
  }

  /*  Aktív link kiemelése */
  .navbar-nav .nav-link:hover,
  .navbar-nav .nav-link:focus {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }

  /*  Megakadályozzuk az összecsúszást mobil nézetben */
  @media (max-width: 991px) {
    .navbar-nav {
      text-align: center;
    }
    .navbar-nav .nav-item {
      margin-bottom: 10px;
    }
  }
</style>
