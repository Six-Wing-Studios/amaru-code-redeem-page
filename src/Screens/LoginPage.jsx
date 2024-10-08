import { React, useState } from 'react';

import { Icon } from 'react-icons-kit';

import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { checkCircle } from 'react-icons-kit/fa/checkCircle'

import { toast } from 'react-toastify';

import './LoginPage.css';
import { login, LoginResult, redeemCode, RedeemResult } from '../AmaruFirebaseInterface';

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [code, setCode] = useState("");
  const [codeFieldText, setCodeFieldText] = useState("")

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const invalidFieldStyle = { borderColor: 'red' };

  const [ invalidEmailStyle, setInvalidEmailStyle ] = useState({});
  const [ invalidPwStyle, setInvalidPasswordStyle ] = useState({});
  const [ invalidGiftCodeStyle, setInvalidGiftCodeStyle ] = useState({});

  const [ redeemSucceeded, setRedeemSucceeded ] = useState(false);

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

  const handleSubmitBtn = async () => {
    const loginResult = await login(email, password);

    setInvalidEmailStyle({});
    setInvalidPasswordStyle({});
    setInvalidGiftCodeStyle({});

    if (!loginResult.uid) {
      if (loginResult.resultCode === LoginResult.NO_EMAIL) {
        setInvalidEmailStyle(invalidFieldStyle);
        toast.error("No Email address was entered!");
      } else if (loginResult.resultCode === LoginResult.NO_PASSWORD) {
        setInvalidPasswordStyle(invalidFieldStyle);
        toast.error("No Password was entered!");
      } else if (loginResult.resultCode === LoginResult.BAD_EMAIL) {
        setInvalidEmailStyle(invalidFieldStyle);
        toast.error("An invalid Email was entered");
      } else if (loginResult.resultCode === LoginResult.BAD_PASSWORD) {
        setInvalidPasswordStyle(invalidFieldStyle);
        toast.error("An invalid Password was entered");
      } else {
        toast.error("An unknown error occurred while logging in.");
      }

      return;
    }

    const userUid = loginResult.uid;

    const redeemResult = await redeemCode(userUid, code);

    if (redeemResult !== RedeemResult.SUCCESS) {
      if (redeemResult === RedeemResult.NO_UID) {
        toast.error("There's been an unknown error while redeeming the gift code.");
      } else if (redeemResult === RedeemResult.NO_CODE) {
        setInvalidGiftCodeStyle(invalidFieldStyle);
        toast.error("No Gift Code was provided!");
      } else if (redeemResult === RedeemResult.CODE_ALREADY_USED) {
        setInvalidGiftCodeStyle(invalidFieldStyle);
        toast.error("The provided gift code has already been redeemed.");
      } else if (redeemResult === RedeemResult.CODE_NOT_FOUND) {
        setInvalidGiftCodeStyle(invalidFieldStyle);
        toast.error("The provided gift code is invalid");
      } else if (redeemResult === RedeemResult.USER_ALREADY_OWNS) {
        setInvalidGiftCodeStyle(invalidFieldStyle);
        toast.error("You already own the content that this gift code unlocks!");
      } else {
        toast.error(`An unknown error has occurred while redeeming the provided gift code.`);
      }
    }
    else {
      toast.success("Congratulations! The gift code was successfully redeemed!", {
        autoClose: false,
      });
      //alert("success");
      doSuccessFormat();
    }
  }

  const doSuccessFormat = () => {
    //disable the submit button, maybe recolor it and show "success!" or something
    setRedeemSucceeded(true);
  }

  return (
    <div className='container'>
      <div>
        <h1 className="header">Login</h1>
      </div>

      <div className="loginsection">
        <input 
          className='emailField'
          style={invalidEmailStyle}
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <span className='pwFieldContainer'>
          <input 
            className='pwField'
            style={invalidPwStyle}
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

        <div className='createAcctC2A'>
          Use the credentials you use to log into the Amaru app. If you do not have an account yet, download Amaru and create one.
        </div>
      </div>

      <div className='codeC2aText'>
        Enter the 8-digit code from your plushie to redeem your bonus content in the Amaru app!
      </div>

      <div>
        <input 
          className='codeField'
          style={invalidGiftCodeStyle}
          placeholder='ABCD-1234'
          value={codeFieldText}
          onChange={onCodeInputChanged}
        />
      </div>
      
      <div>
        {!redeemSucceeded ?
          <button className='submitBtn' onClick={handleSubmitBtn}>Submit</button> :
          <div className='successContainer'>
            <Icon icon={checkCircle} size={40}/>
            Success!
          </div>}
      </div>

      <div className='infoReminder'>Having trouble? Please message info@sixwingstudios.com</div>
    </div>
  )
};

export default LoginPage;
