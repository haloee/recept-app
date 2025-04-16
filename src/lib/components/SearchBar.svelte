<script>
  export let query = '';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="search-container">
  <input
    type="text"
    bind:value={query}
    placeholder="Írd be a recept nevét vagy a hozzávalót angolul"
  />
  <button on:click={() => dispatch('search')} aria-label="Recept keresése">Keresés</button>
</div>

<style>
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 40px auto 20px auto; /*felső margó hozzáadva*/
    max-width: 700px;
    flex-wrap: wrap;
    padding: 0 1rem;
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

  @media (max-width: 768px) {
    .search-container {
      flex-direction: column;
      align-items: stretch;
    }

    input {
      width: 100%;
    }

    button {
      width: 100%;
    }
  }
</style>
