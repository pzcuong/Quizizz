<script>
	let oldPassword = '';
	let newPassword = '';
	let confirmNewPassword = '';

	function changePassword() {
		// Logic to change password
	}

	function cancel() {
		// Logic to cancel password change
	}
</script>

<div class="flex flex-col items-center space-y-8">
	<form class="w-full max-w-sm">
		<label class="block">
			<span class="text-gray-700">Old Password</span>
			<input
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				bind:value={oldPassword}
				type="password"
			/>
		</label>
		<label class="block">
			<span class="text-gray-700">New Password</span>
			<input
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				bind:value={newPassword}
				type="password"
			/>
		</label>
		<label class="block">
			<span class="text-gray-700">Confirm New Password</span>
			<input
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				bind:value={confirmNewPassword}
				type="password"
			/>
		</label>
		<div class="flex justify-end space-x-4 mt-8">
			<button class="py-2 px-4 border border-gray-300 rounded" on:click={cancel} type="button"
				>Cancel</button
			>
			<button
				class="py-2 px-4 bg-blue-500 text-white rounded"
				on:click={changePassword}
				type="button">Change Password</button
			>
		</div>
	</form>
</div>

<style>
	.tab-button {
		border-bottom: 2px solid transparent;
	}

	.tab-button.active {
		border-bottom-color: #48bb78;
	}
</style>
