<script>
  export let ingredient;
  export let onAdd;
</script>

<li class="list-group-item d-flex justify-content-between align-items-center">
  {ingredient.name} ({ingredient.amount} {ingredient.unit})
  <button class="btn btn-sm btn-success" on:click={() => onAdd(ingredient)}>Hozzáadás</button>
</li>
