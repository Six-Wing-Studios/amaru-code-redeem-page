import { React, useState } from 'react';

import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

import './LoginPage.css';

const LoginPage = () => {

  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
  }

  return (
    <div className='container'>
      <div>
        <h1 className="header">Login</h1>
      </div>

      <div className="loginsection">
        <input 
          className='emailField'
          type='email'
          placeholder='Email'
        />

        <span className='pwFieldContainer'>
          <input 
            className='pwField'
            type={type}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className='eyeBtn' onClick={handleToggle}>
            <Icon icon={icon} size={25}/>
          </span>
        </span>

        <div className='forgotPw'>Forgot Password?</div>
      </div>

      <div className='codeC2aText'>
        Enter the 8-digit code from your plushie to redeem your bonus content in the Amaru app!
      </div>

      <div>
        <input 
          className='codeField'
          placeholder='ABCD-1234'
        />
      </div>
      
      <div>
        <button className='submitBtn'>Submit</button>
      </div>

      <>Having trouble? Please message info@sixwingstudios.com</>
    </div>
  )
};

export default LoginPage;
