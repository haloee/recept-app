<script>
  import SearchBar from '$lib/components/SearchBar.svelte';
  import RecipeGrid from '$lib/components/RecipeGrid.svelte';
  import RecipeDetails from '$lib/components/RecipeDetails.svelte';

  let query = '';
  let recipes = [];
  let selectedRecipe = null;
  let loadingDetails = false;

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
  loadingDetails = true;
  try {
    const res = await fetch(`/api/recipes?id=${recipeId}`);
    if (!res.ok) throw new Error("Nem sikerült lekérni a recept információt");

    selectedRecipe = await res.json();
  } catch (error) {
    console.error("Nem sikerült lekérni a recept részleteit:", error);
  } finally {
    loadingDetails = false;
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
{#if loadingDetails}
  <LoadingSpinner />
{:else if selectedRecipe}
  <RecipeDetails {selectedRecipe} on:addToList={(e) => addIngredientToShoppingList(e.detail)} />
{/if}

<h1>Receptkereső</h1>

<!-- 🔍 Kereső komponens -->
<SearchBar bind:query on:search={searchRecipes} />

<!-- 🧾 Receptlista komponens -->
<RecipeGrid {recipes} on:select={(e) => getRecipeDetails(e.detail)} />

<!-- 🍲 Recept részletek komponens -->
{#if selectedRecipe}
  <RecipeDetails {selectedRecipe} on:addToList={(e) => addIngredientToShoppingList(e.detail)} />
{/if}
