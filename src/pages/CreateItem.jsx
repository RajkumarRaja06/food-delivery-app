import '../styles/createItem.css';
import {
  MdFastfood,
  MdCloudUpload,
  MdOutlineFoodBank,
  MdDeleteForever,
} from 'react-icons/md';
import { CreateItemConsumer } from '../context/createItemContext';
import { categories } from '../constants';
import { FaRupeeSign } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Loader } from '../components';

import { setData, getData } from '../utils/firebaseFunction';
import { useEffect } from 'react';

const CreateItem = () => {
  const {
    title,
    setTitle,
    category,
    setCategory,
    uploadImage,
    image,
    setImage,
    calories,
    setCalories,
    price,
    setPrice,
    deleteImage,
    isLoading,
    setIsLoading,
  } = CreateItemConsumer();

  const formData = () => {
    try {
      if (title && category && image && calories && price) {
        setIsLoading(true);
        const data = {
          id: `${Date.now()}`,
          title,
          category,
          imageUrl: image,
          calories,
          price,
          quantity: 1,
        };
        setData(data);
        clearFormData();
        setIsLoading(false);
      } else {
        toast.error('Input filed is Mandatory');
      }
    } catch (error) {
      toast.error('Error');
    }
  };

  const fetchData = async () => {
    await getData().then((data) => {
      dispatch({ type: 'GET_DATA', foodData: data });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearFormData = () => {
    setTitle('');
    setCategory('Select Category');
    setImage('');
    setCalories('');
    setPrice('');
  };

  return (
    <div className='createItem'>
      <div className='formInput'>
        <div className='formTitleContainer'>
          <label htmlFor='foodName'>
            <MdFastfood />
          </label>
          <input
            type='text'
            id='foodName'
            placeholder='Give me a title...'
            className='formTitle'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='formCategoryContainer'>
          <select
            className='formCategory'
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='' selected disabled hidden>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.urlParamName}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='formImageContainer'>
          {isLoading ? (
            <div className='loader'>
              <Loader />
            </div>
          ) : image ? (
            <div className='labelContainer-img'>
              <img src={image} alt='uploaded Image' />
              <button onClick={() => deleteImage()}>
                <MdDeleteForever />
              </button>
            </div>
          ) : (
            <div className='labelContainer'>
              <label htmlFor=''>
                <MdCloudUpload />
              </label>
              <p>Click here to upload</p>
            </div>
          )}
          {}
          <div className='formInputImage'>
            <input
              type='file'
              name='uploadImage'
              accept='image/*'
              onChange={uploadImage}
            />
          </div>
        </div>
        <div className='formOtherInput'>
          <div className='formCaloriesContainer'>
            <label htmlFor='calories'>
              <MdOutlineFoodBank />
            </label>
            <input
              type='text'
              id='calories'
              placeholder='Calories...'
              className='formCalories'
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          <div className='formPriceContainer'>
            <label htmlFor='price'>
              <FaRupeeSign />
            </label>
            <input
              type='text'
              id='price'
              placeholder='Price...'
              className='formPrice'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className='formBtn'>
          <input type='button' value='save' onClick={formData} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateItem;
