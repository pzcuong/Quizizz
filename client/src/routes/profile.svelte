<script>
	import Sidebar from '../components/Sidebar.svelte';
	import ProfileTabs from '../components/userSetting/ProfileTabs.svelte';
</script>

<div class="flex h-screen">
	<div class="w-3/10 border-r-2 border-gray-200">
		<Sidebar />
	</div>
	<div class="w-7/10">
		<ProfileTabs />
	</div>
</div>
