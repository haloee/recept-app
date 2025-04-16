<div class="spinner-container">
  <div class="spinner"></div>
</div>

<style>
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 5px solid #ddd;
    border-top: 5px solid #2c7a7b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
