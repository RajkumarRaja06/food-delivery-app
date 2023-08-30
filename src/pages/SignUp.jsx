import { AiOutlineSend } from 'react-icons/ai';
import '../styles/loginCredentials.css';
import img from '../../public/images/emoji.svg';
import { useState } from 'react';
import { UserConsumer } from '../context/userContext';
import { useNavigate, Link } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

const SignUp = () => {
  const [isTrailBtn, setIsTrailBtn] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUserLoginData, setAuthContainer } = UserConsumer();

  const navigate = useNavigate();

  function clearInputField() {
    setEmail('');
    setPassword('');
  }

  const goBack = () => {
    navigate(-1);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/loginCredentials');
        clearInputField();
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          alert('Email already exist');
          navigate('/loginCredentials');
        }
        console.log(err.message);
      });
  };
  return (
    <div className='contact' id='contact'>
      <div className='title-container'>
        <h2 className='title-name'>Sign Up</h2>
        <span className='title-subtitle'>Create your Food Credentials</span>
      </div>

      <form className='contact-form' onSubmit={submitHandler}>
        <input
          type='email'
          name='email'
          placeholder='Enter a valid email address...'
          className='contact-form-email'
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type='text'
          name='password'
          placeholder='Enter your password...'
          className='contact-form-name'
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className='btn-container'>
          <button type='submit' className='btn connect'>
            Register
            <span className='connect-icon'>
              <AiOutlineSend />
            </span>
          </button>
        </div>
        <div className='newUser'>
          Existing user ?{' '}
          <Link to='/loginCredentials'>Click here to login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
