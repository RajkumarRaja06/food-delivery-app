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

export { setData, getData };
