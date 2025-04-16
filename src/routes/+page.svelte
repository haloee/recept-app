<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<div class="container text-center mt-5 pt-5">
  <h1 class="display-4 fw-bold text-primary">Üdvözöl a Recept App!</h1>
  <p class="lead text-muted">
    Fedezd fel a legjobb recepteket, keresd meg kedvenceidet, és könnyedén állíts össze egy bevásárlólistát!  
    Próbáld ki a receptkereső funkciót, vagy böngészd a legnépszerűbb ételeket.  
  </p>

  <div class="row mt-5">
    <div class="col-md-4">
      <div class="card shadow">
        <img src="/spring-roll-6760871_640.jpg" class="card-img-top" alt="Receptek">
        <div class="card-body">
          <h5 class="card-title">Receptkereső</h5>
          <p class="card-text">Keress recepteket név vagy összetevő alapján.</p>
          <a href="/recipes" class="btn btn-primary">Keresés</a>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card shadow">
        <img src="/istockphoto-871227828-612x612.jpg" class="card-img-top" alt="Bevásárlólista">
        <div class="card-body">
          <h5 class="card-title">Bevásárlólista</h5>
          <p class="card-text">Tárold az összetevőket és készíts bevásárlólistát.</p>
          <a href="/shopping-list" class="btn btn-primary">Listám</a>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card shadow">
        <img src="/istockphoto-1588340755-612x612.jpg" class="card-img-top" alt="Népszerű Receptek">
        <div class="card-body">
          <h5 class="card-title">Népszerű Receptek</h5>
          <p class="card-text">Böngészd a legnépszerűbb recepteket.</p>
          <a href="/popular" class="btn btn-primary">Megnézem</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 900px;
  }

  .card {
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .btn-primary {
    background-color: #4CAF50;
    border: none;
  }

  .btn-primary:hover {
    background-color: #45a049;
  }
</style>
