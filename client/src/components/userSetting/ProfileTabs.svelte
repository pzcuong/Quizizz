<script>
	import { onMount } from 'svelte';
	import EditProfile from './EditProfile.svelte';
	import ChangePassword from './ChangePassword.svelte';

	let currentTab = 'EditProfile';

	function switchTab(tab) {
		currentTab = tab;
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center p-4">
	<h1 class="text-2xl font-bold mb-4 text-center">Profile</h1>

	<div class="mb-8 flex justify-center space-x-4">
		<button
			class="pb-1 border-b-2 border-transparent hover:border-blue-500"
			class:active={currentTab === 'EditProfile'}
			on:click={() => switchTab('EditProfile')}>Edit Profile</button
		>
		<button
			class="pb-1 border-b-2 border-transparent hover:border-blue-500"
			class:active={currentTab === 'ChangePassword'}
			on:click={() => switchTab('ChangePassword')}>Change Password</button
		>
	</div>

	<div class="w-full">
		{#if currentTab === 'EditProfile'}
			<EditProfile />
		{:else if currentTab === 'ChangePassword'}
			<ChangePassword />
		{/if}
	</div>
</div>

<style>
	.active {
		border-bottom: 2px solid #48bb78;
	}
</style>
