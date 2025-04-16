<script>
  import { createEventDispatcher } from 'svelte';
  export let recipes = [];
  const dispatch = createEventDispatcher();
</script>

<div class="recipes-container">
  {#each recipes as recipe}
    <div 
      class="recipe-card"
      role="button"
      tabindex="0"
      on:click={() => dispatch('select', recipe.id)}
      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && dispatch('select', recipe.id)}
    >
      <img src={recipe.image} alt={recipe.title} />
      <h3 class="recipe-title">{recipe.title}</h3>
      <p class="recipe-summary">{recipe.summary}</p>
    </div>
  {/each}
</div>

<style>
  .recipes-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }

  .recipe-card {
    background: white;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .recipe-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .recipe-card img {
    width: 100%;
    border-radius: 12px;
    height: 180px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .recipe-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0.5rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recipe-summary {
    font-size: 0.9rem;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 15; /* max 3 sorban jelenik meg */
    -webkit-box-orient: vertical;
  }
</style>
