import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDyOYuYblLh64EylqiRYF_tqDMWwBN44is",
  authDomain: "trivia-game-3ca4d.firebaseapp.com",
  projectId: "trivia-game-3ca4d",
  storageBucket: "trivia-game-3ca4d.firebasestorage.app",
  messagingSenderId: "776744807180",
  appId: "1:776744807180:web:123a5a3c1bcc422bafb729"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.settings.appVerificationDisabledForTesting = false;

export { auth };
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();