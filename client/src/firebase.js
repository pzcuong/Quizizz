// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
	GithubAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyA2unT_jGPlEJIT_UfsZeIg4KC1IihUp10',
	authDomain: 'oauth---ptquiz.firebaseapp.com',
	projectId: 'oauth---ptquiz',
	storageBucket: 'oauth---ptquiz.appspot.com'
	// redirectUri: 'http://localhost:3000/api/auth/login'
	// messagingSenderId: 'your-messaging-sender-id',
	// appId: 'your-app-id'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, facebookProvider, githubProvider };
