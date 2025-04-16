<script>
  import { onMount } from 'svelte';

  let query = '';
  let recipes = [];
  let selectedRecipe = null; // Kijelölt recept részleteinek megjelenítése

  async function searchRecipes() {
    try {
      const res = await fetch(`/api/recipes?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Hiba történt a receptek keresése során");
      recipes = await res.json();
    } catch (error) {
      console.error("Nem sikerült keresni a recepteket:", error);
    }
  }

  async function getRecipeDetails(recipeId) {
    try {
      const res = await fetch(`/api/recipes?id=${recipeId}`);
      if (!res.ok) throw new Error("Nem sikerült lekérni a recept információt");

      selectedRecipe = await res.json();
    } catch (error) {
      console.error("Nem sikerült lekérni a recept részleteit:", error);
    }
  }

  async function addIngredientToShoppingList(ingredient) {
    try {
      await fetch('/api/shopping-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredientName: ingredient.name,
          quantity: ingredient.amount,
          unit: ingredient.unit
        })
      });

      alert(` ${ingredient.name} hozzáadva a bevásárlólistához!`);
    } catch (error) {
      console.error(" Nem sikerült hozzáadni az összetevőt:", error);
    }
  }
</script>

<h1> Receptkereső</h1>

<!--  Keresősáv középre igazítva -->
<div class="search-container">
  <input type="text" bind:value={query} placeholder="Írd be a recept nevét vagy a hozzávalót angolul" />
  <button on:click={searchRecipes} aria-label="Recept keresése"> Keresés</button>
</div>

<!-- Recept találatok -->
<div class="recipes-container">
  {#each recipes as recipe}
    <div 
      class="recipe-card"
      role="button"
      tabindex="0"
      on:click={() => getRecipeDetails(recipe.id)}
      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && getRecipeDetails(recipe.id)}
    >
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.summary}</p>
    </div>
  {/each}
</div>

<!-- Recept részletei -->
{#if selectedRecipe}
  <div class="recipe-details">
    <h2>{selectedRecipe.title}</h2>
    <img src={selectedRecipe.image} alt={selectedRecipe.title} />

    <h3> Hozzávalók:</h3>
    <ul>
      {#each selectedRecipe.extendedIngredients as ingredient}
        <li>
          {ingredient.name} - {ingredient.amount} {ingredient.unit}
          <button on:click={() => addIngredientToShoppingList(ingredient)}> Listához adás</button>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<!-- CSS -->
<style>
  /*  Alapstílusok */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    color: #333;
    text-align: center;
    margin: 0;
    padding: 20px;
  }

  h1 {
    color: #2c7a7b;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  /*  Keresősáv középre igazítása */
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  input {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 370px;
    transition: 0.3s;
  }

  input:focus {
    border-color: #2c7a7b;
    outline: none;
    box-shadow: 0 0 8px rgba(44, 122, 123, 0.5);
  }

  button {
    background-color: #2c7a7b;
    color: white;
    padding: 12px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.3s, transform 0.2s;
  }

  button:hover {
    background-color: #246366;
    transform: scale(1.05);
  }

  /*  Recept kártyák */
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
  }

  .recipe-details {
    margin-top: 20px;
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }

  .recipe-details h2 {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    color: #2c7a7b;
  }

  .recipe-details ul {
    list-style-type: none;
    padding: 0;
  }

  .recipe-details li {
    background: #f4f4f4;
    padding: 12px;
    margin: 5px 0;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
  }

  .recipe-details button {
    background-color: #ff9800;
    font-size: 14px;
    padding: 8px 12px;
  }

  .recipe-details button:hover {
    background-color: #e68900;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    input {
      width: 200px;
    }
  }
</style>
