// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// };

// please comment out this code

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyA3j5dRhCjo_4LWQmpz4pGdXRKBjWJwpJ0',
  authDomain: 'testing-fbb89.firebaseapp.com',
  projectId: 'testing-fbb89',
  storageBucket: 'testing-fbb89.firebasestorage.app',
  messagingSenderId: '798367411409',
  appId: '1:798367411409:web:4608566c1c674c5131a9f0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
