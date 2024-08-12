import { React, useState } from 'react';

import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

import './LoginPage.css'

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
    <div className='loginPage'>
      <div className='headerContainer'>
        <h1 className="header">Login</h1>
      </div>

      <div className="loginsection">
        <input 
          className='inField'
          type='email'
          placeholder='Email'
        />
        <div className='pwFieldContainer'>
          <input 
            className='inField'
            type={type}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className='eyeBtn' onClick={handleToggle}>
            <Icon icon={icon} size={25}/>
          </span>
        </div>
        <div>
          <p>Forgot Password?</p>
        </div>
      </div>

      <p>
        Enter the 8-digit code from your plushie to redeem your bonus content in the Amaru app!
      </p>

      <div>
        <input />
      </div>
      
      <button className='submitBtn'>Submit</button>

      <p>Having trouble? Please message info@sixwingstudios.com</p>
    </div>
  )
};

export default LoginPage;
