<script>
  import { onMount } from 'svelte';

  let shoppingList = [];

  //  Form mezők inicializálása
  let newItemName = '';
  let newItemQuantity = 1;
  let newItemUnit = '';

  async function fetchShoppingList() {
    const res = await fetch('/api/shopping-list');
    shoppingList = await res.json();
  }

  async function addItem() {
    if (!newItemName.trim()) return;

    await fetch('/api/shopping-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingredientName: newItemName,
        quantity: newItemQuantity,
        unit: newItemUnit
      })
    });

    await fetchShoppingList();
    newItemName = '';
    newItemQuantity = 1;
    newItemUnit = '';
  }

  async function removeItem(id) {
    await fetch('/api/shopping-list', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    await fetchShoppingList();
  }

  onMount(fetchShoppingList);
</script>

<div class="shopping-list-page">
  <h1>Bevásárlólista</h1>

  <div class="shopping-list-container">
    <ul>
      {#each shoppingList as item}
        <li>
          {item.ingredientName} - {item.quantity} {item.unit}
          <button on:click={() => removeItem(item.id)}>Törlés</button>
        </li>
      {/each}
    </ul>
  </div>

  <div class="form-container">
    <h2> Hozzávaló hozzáadása</h2>
    <input type="text" bind:value={newItemName} placeholder="Hozzávaló neve" />
    <input type="number" bind:value={newItemQuantity} placeholder="Mennyiség" />
    <input type="text" bind:value={newItemUnit} placeholder="Mértékegység" />
    <button class="add" on:click={addItem}> Hozzáadás</button>
  </div>
</div>

<style>
  /*  Színek és alap változók */
  :root {
    --primary-color: #4CAF50;
    --secondary-color: #f4f4f4;
    --danger-color: #ff5252;
    --max-width: 600px;
  }

  /*  Oldal alapstílus */
  .shopping-list-page {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    min-height: 100vh;
  }

  /* Fejléc */
  h1 {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  /* Bevásárlólista konténer */
  .shopping-list-container {
    width: 100%;
    max-width: var(--max-width);
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  /* Lista elemek */
  ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--secondary-color);
    padding: 0.8rem 1rem;
    margin: 0.5rem 0;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
  }

  /* Gombok */
  button {
    background: var(--danger-color);
    border: none;
    color: white;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
  }

  button:hover {
    background: rgba(255, 82, 82, 0.8);
  }

  button.add {
    background: var(--primary-color);
    font-size: 1rem;
    padding: 0.6rem;
    border-radius: 5px;
    width: 100%;
    max-width: 400px;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 0.5rem;
  }

  button.add:hover {
    background: rgba(76, 175, 80, 0.8);
  }

  /* Form konténer */
  .form-container {
    background: var(--secondary-color);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: var(--max-width);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  /* Input mezők */
  input {
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    font-size: 1rem;
  }

  /* Reszponzív beállítások */
  @media (max-width: 768px) {
    h1 {
      font-size: 1.8rem;
    }

    .shopping-list-container {
      padding: 0.8rem;
    }

    li {
      flex-direction: column;
      align-items: flex-start;
      font-size: 0.9rem;
    }

    button {
      width: 100%;
    }

    .form-container {
      padding: 0.8rem;
    }
  }
</style>
