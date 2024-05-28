import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBT155sSkqd5T_jKn8WsjGits0SSB-fIEI",
  authDomain: "quizler-cbt.firebaseapp.com",
  projectId: "quizler-cbt",
  storageBucket: "quizler-cbt.appspot.com",
  messagingSenderId: "516056589294",
  appId: "1:516056589294:web:f73afb968ab1946416e4ff",
  measurementId: "G-P0W4MMKTQR"
};

// Initialize Firebase
export default initializeApp(firebaseConfig);