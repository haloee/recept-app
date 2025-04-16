<script>
  import { onMount } from 'svelte';

  let recipes = [];

  async function fetchPopularRecipes() {
    try {
      const res = await fetch('/api/popular');
      recipes = await res.json();
    } catch (error) {
      console.error("Nem sikerült lekérni a recepteket:", error);
    }
  }

  onMount(fetchPopularRecipes);
</script>


<h1> Népszerű Receptek</h1>

<div class="recipes-container">
  {#each recipes as recipe}
    <div class="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
     
    </div>
  {/each}
</div>

<style>
  .recipes-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px;
  }
  
  .recipe-card {
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  img {
    max-width: 100%;
    border-radius: 10px;
  }
  
  button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 5px;
  }
</style>
