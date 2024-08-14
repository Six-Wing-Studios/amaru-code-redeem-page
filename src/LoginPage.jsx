import { React, useState } from 'react';

import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

import './LoginPage.css';

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [code, setCode] = useState("");
  const [codeFieldText, setCodeFieldText] = useState("")

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

  const forgotPwLink = () => {
    
  }

  const onCodeInputChanged = (event) => {
    let newCode = event.target.value;

    newCode = newCode.replace('-', '');
    newCode = newCode.toUpperCase();

    if (newCode.length > 8) {
      newCode = newCode.substring(0, 8);
    }

    setCode(newCode);

    let newCodeReadout = newCode;

    if (newCode.length > 4) {
      newCodeReadout = newCode.substring(0, 4) + '-' + newCode.substring(4);
    }

    setCodeFieldText(newCodeReadout);
  }

  const handleSubmitBtn = () => {
    //test code real quick
    alert(code);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        {/* <div className='forgotPw' onClick={forgotPwLink} >
          Forgot Password?
        </div> */}
      </div>

      <div className='codeC2aText'>
        Enter the 8-digit code from your plushie to redeem your bonus content in the Amaru app!
      </div>

      <div>
        <input 
          className='codeField'
          placeholder='ABCD-1234'
          value={codeFieldText}
          onChange={onCodeInputChanged}
        />
      </div>
      
      <div>
        <button className='submitBtn' onClick={handleSubmitBtn}>Submit</button>
      </div>

      <div className='infoReminder'>Having trouble? Please message info@sixwingstudios.com</div>
    </div>
  )
};

export default LoginPage;
