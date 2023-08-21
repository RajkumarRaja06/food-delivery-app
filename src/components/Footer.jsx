import { BsGithub, BsLinkedin } from 'react-icons/bs';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className='footer' id='services'>
      <p>
        Copyright © React Food App 2023. All rights reserved{' '}
        <a href='https://rajkumarraja-portfolio.netlify.app/' target='_blank'>
          ❤️ RajKumarRaja
        </a>
      </p>
      <div className='footerLink'>
        <span>
          <a href='https://github.com/RajkumarRaja06' target='_blank'>
            <BsGithub />
          </a>
        </span>
        <span>
          <a href='https://www.linkedin.com/in/rajkumarraja06/' target='_blank'>
            <BsLinkedin />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
