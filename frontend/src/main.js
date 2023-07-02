import App from './App.svelte';
import { Router, Route } from 'svelte-routing';

const app = new App({
  target: document.body,
});

const router = new Router({
  '*': Route, // Handle all routes
});

router.start();
