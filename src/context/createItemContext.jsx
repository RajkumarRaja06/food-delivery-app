import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from 'react';

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../utils/firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateItemContext = createContext();

import reducer from '../utils/reducer/createItemReducer';
import { getData } from '../utils/firebaseFunction';

const initialState = {
  foodData: null,
};

const CreateItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    await getData().then((data) => {
      dispatch({ type: 'GET_DATA', foodData: data });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];

    const storageRef = ref(storage, `Images/${Date.now()}/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            toast.warning('Waiting to image upload paused');
            break;
          case 'running':
            toast.warning('Waiting to image upload');
            break;
        }
      },
      (error) => {
        console.log('Error', error);
        toast.error('Error', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          toast.success('Image upload successfully');
          setIsLoading(false);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const desertRef = ref(storage, image);

    deleteObject(desertRef)
      .then(() => {
        toast.success('Image deleted successfully');
        setIsLoading(false);
        setImage(null);
      })
      .catch((error) => {
        console.log('Error', error);
        toast.error('Error', error);
      });
  };

  return (
    <CreateItemContext.Provider
      value={{
        ...state,
        title,
        setTitle,
        category,
        setCategory,
        uploadImage,
        image,
        setImage,
        isLoading,
        setIsLoading,
        calories,
        setCalories,
        price,
        setPrice,
        deleteImage,
      }}
    >
      {children}
    </CreateItemContext.Provider>
  );
};

const CreateItemConsumer = () => {
  return useContext(CreateItemContext);
};

export { CreateItemContext, CreateItemProvider, CreateItemConsumer };
