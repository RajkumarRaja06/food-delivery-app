import {
  doc,
  setDoc,
  query,
  getDocs,
  collection,
  orderBy,
} from 'firebase/firestore';
import { firestore } from './firebase';

const setData = async (data) => {
  const foodListRef = doc(firestore, 'foodList', `${Date.now()}`);
  await setDoc(foodListRef, data, { merge: true });
};

const getData = async () => {
  const getDataRef = await getDocs(
    query(collection(firestore, 'foodList'), orderBy('id', 'desc'))
  );

  return getDataRef.docs.map((doc) => doc.data());
};

const setProfileData = async (data) => {
  const profileRef = doc(firestore, 'usersProfile', `${Date.now()}`);
  await setDoc(profileRef, data, { merge: true });
};

const profileCollectionRef = collection(firestore, 'usersProfile');

const getProfileData = async () => {
  const data = await getDocs(profileCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export { setData, getData, setProfileData, getProfileData };
