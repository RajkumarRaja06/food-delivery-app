import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from 'react';

import { auth, provider } from '../utils/firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { storage } from '../utils/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getProfileData } from '../utils/firebaseFunction';

import profileReducer from '../utils/reducer/profileReducer';
import { toast } from 'react-toastify';

const initialState = {
  profileData: [],
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const [userLoginData, setUserLoginData] = useState(null);
  const [isMenu, setIsMenu] = useState(false);
  const [authContainer, setAuthContainer] = useState(false);
  const [isUserLogIn, setIsUserLogIn] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [selectCity, setSelectCity] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState('');

  const fetchProfileData = async () => {
    await getProfileData().then((data) => {
      dispatch({ type: 'GET_PROFILE_DATA', profileData: data });
    });
  };

  const login = async () => {
    if (!userLoginData) {
      setAuthContainer(!authContainer);
      const { user } = await signInWithPopup(auth, provider);
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    signOut(auth);
    setUserLoginData('');
    setIsUserLogIn(false);
  };

  const getUserProfile = () => {
    const filterUser = state.profileData.find((item) => item.email === email);

    if (filterUser) {
      if (filterUser === 'undefined') {
        setIsEditing(false);
        setName();
        setSelectCity();
        setGender();
        setImage();
        setNumber();
      } else {
        setIsEditing(true);
        setId(filterUser.id);
        setEmail(filterUser.email);
        setName(filterUser.name);
        setSelectCity(filterUser.selectCity);
        setGender(filterUser.gender);
        setImage(filterUser.image);
        setNumber(filterUser.number);
      }
    }
  };

  const getImageUrl = (event) => {
    const imageFile = event.target.files[0];

    const storageRef = ref(
      storage,
      `FoodUsersProfile/${Date.now()}/${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            toast.info('Upload is Paused!');
            break;
          case 'running':
            toast.warning('Waiting for Image Upload!!');
            break;
        }
      },
      (error) => {
        console.log('Error', error);
        toast.error('Error... Try Again!');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          toast.success('Image Uploaded Successfully!');
        });
      }
    );
  };

  const emptyValue = () => {
    setName(null);
    setEmail(null);
    setNumber(null);
    setSelectCity(null);
    setGender(null);
    setImage(null);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    let subscriber = onAuthStateChanged(auth, (user) => {
      // console.log(auth.currentUser); //returns null now
      if (user) {
        setUserLoginData(user.providerData[0]);
        setEmail(user.providerData[0].email);
        setIsUserLogIn(true);
      }
    });

    return subscriber;
  }, [state.profileData]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        userLoginData,
        setUserLoginData,
        login,
        isMenu,
        setIsMenu,
        logout,
        authContainer,
        setAuthContainer,
        isUserLogIn,
        setIsUserLogIn,
        id,
        setId,
        name,
        setName,
        email,
        setEmail,
        number,
        setNumber,
        selectCity,
        setSelectCity,
        gender,
        setGender,
        image,
        setImage,
        isEditing,
        setIsEditing,
        getUserProfile,
        getImageUrl,
        emptyValue,
        fetchProfileData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UserConsumer = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider, UserConsumer };
