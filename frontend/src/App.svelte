<!-- src/App.svelte -->
<script>
	import { Router, Link, Route } from "svelte-routing";
	import Register from "./components/Register.svelte";
	import Login from "./components/Login.svelte";
	import Profile from "./components/Profile.svelte";
  </script>
  
  <Router>
	<nav>
	  <Link to="/register">Register</Link>
	</nav>
  
	<Route path="/register" component={Register} />
	<Route path="/login" component={Login} />
	<Route path="/profile" component={Profile} />
  </Router>
  

  