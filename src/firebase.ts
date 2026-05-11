import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDV39atARU8zOgmzCd6m4nJt6Wmy6fs2Yc",
  authDomain: "omnivibe-auth.firebaseapp.com",
  projectId: "omnivibe-auth",
  storageBucket: "omnivibe-auth.firebasestorage.app",
  messagingSenderId: "135832651240",
  appId: "1:135832651240:web:8a614ccb4051d3a70d905d",
  measurementId: "G-TB5Z93GKHV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };
