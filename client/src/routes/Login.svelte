<!-- src/Login.svelte -->
<script>
	import { signInWithPopup } from 'firebase/auth';
	import { auth, googleProvider, facebookProvider, githubProvider } from '../firebase';

	let user;

	const signIn = async (provider) => {
		try {
			const result = await signInWithPopup(auth, provider);
			user = result.user;
			const token = await user.getIdToken();

			const response = await fetch('http://localhost:8080/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ idToken: token })
			});

			const data = await response.json();
			console.log('Success:', data);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const signInWithGoogle = () => signIn(googleProvider);
	const signInWithGithub = () => signIn(githubProvider);
</script>

<button on:click={signInWithGoogle}>Sign in with Google</button>
<button on:click={signInWithGithub}>Sign in with GitHub</button>
