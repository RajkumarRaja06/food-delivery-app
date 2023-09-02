import { AiOutlineSend } from 'react-icons/ai';
import '../styles/loginCredentials.css';
import { useState } from 'react';
import { UserConsumer } from '../context/userContext';
import { useNavigate, Link } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

const LoginCredentials = () => {
  const [isTrailBtn, setIsTrailBtn] = useState(false);
  const { setAuthContainer } = UserConsumer();
  const [newEmail, setNewEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, newEmail, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setAuthContainer(false);

        navigate('/');
        clearInputField();
      })
      .catch((err) => {
        console.log('Err', err.message);
      });
  };

  function clearInputField() {
    setNewEmail('');
    setPassword('');
  }

  return (
    <div className='contact' id='contact'>
      <div className='title-container'>
        <h2 className='title-name'>Login</h2>
        <span className='title-subtitle'>Open your Food Delivery App</span>
      </div>

      <form className='contact-form' onSubmit={submitHandler}>
        <input
          type='email'
          name='email'
          placeholder='Enter a email address...'
          className='contact-form-email'
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
          required
        />
        <input
          type='password'
          name='name'
          placeholder='Enter your password...'
          className='contact-form-name'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <div className='btn-container'>
          <button type='submit' className='btn connect'>
            Login
            <span className='connect-icon'>
              <AiOutlineSend />
            </span>
          </button>
          <button
            type='submit'
            className='btn trail'
            onClick={() => setIsTrailBtn(!isTrailBtn)}
          >
            Trial Use
          </button>
          {isTrailBtn && (
            <div className='trail-email'>
              <div>
                <h4>Email :</h4>
                <p>rajfoodapp@gamil.com</p>
              </div>
              <div>
                <h4>Password :</h4>
                <p>Rajapp123#</p>
              </div>
            </div>
          )}
        </div>
        <div className='newUser'>
          New to FoodApp ? <Link to='/signUp'>Click here to Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginCredentials;
