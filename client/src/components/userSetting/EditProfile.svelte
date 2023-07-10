<script>
	let username = '';
	let email = '';
	let displayName = '';
	let avatarUrl = 'path/to/default-avatar.png';
	let isEditingAvatar = false;

	function handleSave() {
		console.log({ username, email, displayName });
	}

	function handleCancel() {
		username = '';
		email = '';
		displayName = '';
	}
	function handleAvatarClick() {
		isEditingAvatar = true;
	}

	function handleAvatarChange(event) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			avatarUrl = reader.result;
			isEditingAvatar = false;
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	}
</script>

<div class="w-full flex flex-col space-y-4">
	<div class="relative">
		<img
			src={avatarUrl}
			alt="Avatar"
			class="w-20 h-20 rounded-full cursor-pointer"
			on:click={handleAvatarClick}
		/>
		{#if isEditingAvatar}
			<input
				type="file"
				accept="image/*"
				class="absolute inset-0 opacity-0 cursor-pointer"
				on:change={handleAvatarChange}
			/>
		{/if}
	</div>

	<input
		bind:value={username}
		class="w-full border-2 border-gray-200 rounded-lg p-2"
		disabled
		placeholder="Username"
	/>

	<input
		bind:value={email}
		class="w-full border-2 border-gray-200 rounded-lg p-2"
		disabled
		placeholder="Email"
	/>

	<input
		bind:value={displayName}
		class="w-full border-2 border-gray-200 rounded-lg p-2"
		placeholder="Display name"
	/>

	<div class="flex justify-end space-x-2">
		<button class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800" on:click={handleCancel}
			>Cancel</button
		>
		<button class="px-4 py-2 rounded-lg bg-blue-500 text-white" on:click={handleSave}
			>Save</button
		>
	</div>
</div>
