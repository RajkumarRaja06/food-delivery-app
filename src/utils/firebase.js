import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDdzBOgKUnxT7hWIeV1iQHIWo_4vOdaWH0',
  authDomain: 'fooddeliveryapp-e0bc5.firebaseapp.com',
  databaseURL: 'https://fooddeliveryapp-e0bc5-default-rtdb.firebaseio.com',
  projectId: 'fooddeliveryapp-e0bc5',
  storageBucket: 'fooddeliveryapp-e0bc5.appspot.com',
  messagingSenderId: '566713209355',
  appId: '1:566713209355:web:fc96a478817897c0942d0e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, firestore, storage };
