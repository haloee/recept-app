<script>
  export let recipe;
</script>

{#if recipe}
  <div class="card mt-4">
    <div class="card-body">
      <h2>{recipe.title}</h2>
      <p>🔗 <a href={recipe.sourceUrl} target="_blank">Eredeti recept</a></p>
      <ul>
        {#each recipe.extendedIngredients as ingredient}
          <li>{ingredient.original}</li>
        {/each}
      </ul>
    </div>
  </div>
{/if}
