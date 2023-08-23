import { AiOutlineSend } from 'react-icons/ai';
import '../styles/loginCredentials.css';
import img from '../../public/images/emoji.svg';
import { useState } from 'react';
import { UserConsumer } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const LoginCredentials = () => {
  const { setUserLoginData, setAuthContainer } = UserConsumer();
  const [users, setUsers] = useState({ name: '', email: '' });
  const { name, email } = users;

  const navigate = useNavigate();

  function handleOnchange(event) {
    const value = event.target.value;
    const key = event.target.name;
    setUsers({
      ...users,
      [key]: value,
    });
  }

  function clearInputField() {
    setUsers({ name: '', email: '' });
  }

  const goBack = () => {
    navigate(-1);
  };

  function submitHandler(e) {
    e.preventDefault();
    const userData = {
      uid: Date.now(),
      displayName: users.name,
      email: users.email,
      photoURL: img,
      isLogout: true,
    };

    localStorage.setItem('user', JSON.stringify(userData));
    setUserLoginData(JSON.parse(localStorage.getItem('user')));
    setAuthContainer(false);
    clearInputField();
    goBack();
  }
  return (
    <div className='contact' id='contact'>
      <div className='title-container'>
        <h2 className='title-name'>Login</h2>
        <span className='title-subtitle'>Create your Food Credentials</span>
      </div>

      <form className='contact-form' onSubmit={submitHandler}>
        <input
          type='text'
          name='name'
          placeholder='Enter your Name'
          className='contact-form-name'
          required
          value={name}
          onChange={(event) => handleOnchange(event)}
        />
        <input
          type='email'
          name='email'
          placeholder='Enter a valid email address'
          className='contact-form-email'
          required
          value={email}
          onChange={(event) => handleOnchange(event)}
        />
        <div className='btn-container'>
          <button type='submit' className='btn connect'>
            Login
            <span className='connect-icon'>
              <AiOutlineSend />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginCredentials;
