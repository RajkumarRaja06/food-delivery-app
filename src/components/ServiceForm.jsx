import '../styles/service.css';
import { BsArrowRight } from 'react-icons/bs';
import { useState } from 'react';

const ServiceForm = () => {
  const [input, setInput] = useState(null);

  const submit = () => {
    setInput(null);
  };

  return (
    <div className='serviceForm' id='services'>
      <h1>Subscribe our newsletter.</h1>
      <form
        className='serviceForm-input'
        action='https://formsubmit.co/rkrajkumarco@gmail.com'
        method='POST'
        onClick={submit}
      >
        <input
          type='text'
          name='Message'
          placeholder='Subscribe our newsletter.'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type='submit'>
          Send{' '}
          <span>
            <BsArrowRight />
          </span>
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
