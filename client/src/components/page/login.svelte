<script>
	import FbIcon from '../icon/fbIcon.svelte';
	import GoogeIcon from '../icon/googeIcon.svelte';
</script>

<section class="flex items-stretch text-white justify-center font-body">
	<div class="w-[446px] bg-white rounded-3xl shadow-md shadow-zinc-400 my-6">
		<div class="w-full p-6 flex justify-evenly flex-col items-center gap-6 my-10">
			<h1 class=" text-secondary text-[20px] font-bold">Login to your Account</h1>
			<form class="w-full px-4 lg:px-0 mx-auto" on:submit|preventDefault>
				<div class="py-4">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						class="block w-full p-4 rounded-md border-gray text-zinc-400"
					/>
				</div>
				<div class="py-4">
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						class="block w-full p-4 rounded-md border-gray text-zinc-400"
					/>
				</div>
				<div class=" text-gray-400 hover:underline hover:text-gray-100">
					<a href="#" class="text-secondary">Forgot your password?</a>
				</div>
				<div class="pt-4">
					<button
						class="uppercase block w-full p-4 rounded-md bg-secondary hover:bg-darkGreen focus:outline-none"
						>LOG IN</button
					>
				</div>
			</form>
			<div>
				<p class="text-gray-500 text-center">or use SSO</p>
				<div class="py-6 space-x-2 text-gray-500 flex">
					<button class="border-gray p-2 rounded-md hover:bg-zinc-100 flex items-center">
						<FbIcon />
						<span>Facebook</span>
					</button>
					<button class="border-gray p-2 rounded-md hover:bg-zinc-100 flex items-center">
						<GoogeIcon />
						<span>Google</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.border-gray {
		@apply border border-spacing-1 border-zinc-200;
	}
</style>
