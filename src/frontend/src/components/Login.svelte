<script>
  let username = '';
  let password = '';

  async function login() {
    const response = await fetch('./api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    }
  }

  function handleGoogleLogin() {
    // Handle Google login logic here
    // ...
  }

  function handleFacebookLogin() {
    // Handle Facebook login logic here
    // ...
  }
</script>

<style>
  .container {
    max-width: 400px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button-container button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

  .primary-button {
    background-color: #4caf50;
    color: #ffffff;
  }

  .secondary-button {
    background-color: #f44336;
    color: #ffffff;
  }

  .secondary-button:hover {
    background-color: #d32f2f;
  }

  .google-button {
    background-color: #dd4b39;
    color: #ffffff;
  }

  .google-button:hover {
    background-color: #c23321;
  }

  .signup-link {
    margin-top: 10px;
    text-align: center;
  }

  .signup-link a {
    color: #333333;
    text-decoration: none;
  }
</style>

<div class="container">
  <h1>Welcome back</h1>
  <form>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" placeholder="Enter your username" bind:value={username}>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Enter your password" bind:value={password}>
    </div>
    <div class="button-container">
      <button class="primary-button" on:click={login}>Start now!</button>
      <div>
        Or
        <button class="google-button" on:click={handleGoogleLogin}>Sign in with Google</button>
      </div>
    </div>
  </form>
  <div class="signup-link">
    Don't have an account? <a href="#">Sign up</a>
  </div>
</div>
