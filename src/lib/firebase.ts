import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBuo-aN2B7VL27GyR5w8fCPrrQ7HoQBW1Q",
    authDomain: "zhansaya-614f3.firebaseapp.com",
    databaseURL: "https://zhansaya-614f3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "zhansaya-614f3",
    storageBucket: "zhansaya-614f3.firebasestorage.app",
    messagingSenderId: "530513522475",
    appId: "1:530513522475:web:50fb348bdf40aa0f009f6e",
    measurementId: "G-3PMM4GDRFM"
  };

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);