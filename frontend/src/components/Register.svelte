
<script>
  let username = '';
  let password = '';
  let gender = '';
  let dateOfBirth = '';

  async function handleSubmit() {
    // Handle form submission logic here
    const result = await fetch('./api/auth/register', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await result.json();
    if (data.access_token) {
      localStorage.setItem('username', username);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      redirect('/profile');
    } else 
      alert(data.message);
  }
</script>

<style>
  .registration-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
  }

  .registration-form h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .registration-form label {
    display: block;
    margin-bottom: 8px;
  }

  .registration-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .registration-form select {
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .registration-form button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .registration-form button:hover {
    background-color: #45a049;
  }
</style>

<div class="registration-form">
  <h2>Register</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} required />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />

    <label for="gender">Gender:</label>
    <select id="gender" bind:value={gender}>
      <option value="">Select...</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>

    <label for="dateOfBirth">Date of Birth:</label>
    <input type="date" id="dateOfBirth" bind:value={dateOfBirth} required />

    <button type="submit">Register</button>
  </form>
</div>
