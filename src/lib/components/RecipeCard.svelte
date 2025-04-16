<script>
  export let recipe;
</script>

<div class="card h-100 shadow">
  <img src={recipe.image} class="card-img-top" alt={recipe.title} />
  <div class="card-body">
    <h5 class="card-title">{recipe.title}</h5>
    <button class="btn btn-primary" on:click={() => dispatch('select', recipe.id)}>Részletek</button>
  </div>
</div>
