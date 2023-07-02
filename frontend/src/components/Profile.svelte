<script>
    import { onMount } from 'svelte';
    let isLoading = true;
    let profileData = null;
  
    onMount(async () => {
      try {
        const response = await fetch('./api/user/profile', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('access_token')
                },
            }
        )

        const data = await response.json();
        profileData = data;
        isLoading = false;
      } catch (error) {
        console.error('Error fetching profile data:', error);
        isLoading = false;
      }
    });
  </script>
  
  {#if isLoading}
    <div>Loading...</div>
  {:else if profileData}
    <div>
      <h1>{profileData.username}</h1>
      <!-- Render other profile data here -->
    </div>
  {:else}
    <div>Error loading profile data.</div>
  {/if}
  