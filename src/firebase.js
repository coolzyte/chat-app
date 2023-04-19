import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBFTbe05a3e6DHxkl3fWcrrJsfh1vSPDEs',
  authDomain: 'chat-app-v1-97afe.firebaseapp.com',
  projectId: 'chat-app-v1-97afe',
  storageBucket: 'chat-app-v1-97afe.appspot.com',
  messagingSenderId: '602572151174',
  appId: '1:602572151174:web:1af5cf46b2b16f41de3407',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
