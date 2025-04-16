<script>
  export let query = '';
  export let onSearch = () => {};
</script>

<div class="input-group mb-3">
  <input type="text" class="form-control" bind:value={query} placeholder="Pl. pizza..." />
  <button class="btn btn-outline-primary" on:click={onSearch}>Keresés</button>
</div>
