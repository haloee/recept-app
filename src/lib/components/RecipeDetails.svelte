<script>
  export let selectedRecipe;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleAdd(ingredient) {
    dispatch('addToList', ingredient);
  }
</script>

<div class="recipe-details">
  <h2>{selectedRecipe.title}</h2>
  <img src={selectedRecipe.image} alt={selectedRecipe.title} />

  <h3>Hozzávalók:</h3>
  <ul>
    {#each selectedRecipe.extendedIngredients as ingredient}
      <li>
        {ingredient.name} - {ingredient.amount} {ingredient.unit}
        <button on:click={() => handleAdd(ingredient)}>Listához adás</button>
      </li>
    {/each}
  </ul>
</div>

<style>
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
</style>
