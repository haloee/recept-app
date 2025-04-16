<script>
  import RecipeCard from './RecipeCard.svelte';
  export let recipes = [];
</script>

<div class="row">
  {#each recipes as recipe (recipe.id)}
    <div class="col-md-4 mb-4">
      <RecipeCard {recipe} on:select />
    </div>
  {/each}
</div>
