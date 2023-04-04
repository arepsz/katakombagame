import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

function Register() {
   const [email, setEmail] = useState("");
   const [name, setName] = useState("");
   const [password, setPassword] = useState("");
   const [passwordConfirm, setPasswordConfirm] = useState("");
   const [success, setSuccess] = useState(false);
   const [showMessage, setShowMessage] = useState(false);
   const [error, setError] = useState("");
  
    const onChangeName = (e) => {
      setName(e.target.value);
    };
     
    const onChangeEmail = (e) => {
      setEmail(e.target.value);
    }
     
    const onChangePassword = (e) => {
      setPassword(e.target.value);
    }
     
    const onChangePasswordconfirm = (e) => {
      setPasswordConfirm(e.target.value);
    }

    const handleStatus = (json) => {
      let error = "";
      let success = false;
      if(json['status'] === 400) {
        success = true;
      }else if(json['status'] === 404){
        error = json['fail'];
      }
      setSuccess(success);
      setError(error);
      setShowMessage(true);
      setPassword("");
      setPasswordConfirm("");
    }
  
    const onSubmit = (e) => {
      e.preventDefault();
      const obj = {
        username: name,
        email:  email,
        password: password,
        passwordConfirm:  passwordConfirm
      }
      let local = 'http://localhost:8000/register.php';
      axios.post(local, obj)
      .then(res=> handleStatus(res.data))
      .catch(error => {
        console.log(error.response)
      })
    }
  
    return (
      <div className="register" >
          {showMessage ?
          <p className={success ? "register-message-green" : "register-message-red"}>{success ? "Sikeres" : "Sikertelen"} regisztráció</p> :
          ''}
          {error === "Duplicate" ?
          <p className="error-message-red">Már létezik felhasználó <br></br> ilyen felhasználó</p> :
          ''}
          {error === "Email" ?
          <p className="error-message-red">Hibás emailt adott meg</p> :
          ''}
          {error === "Password" ?
          <p className="error-message-red">Hibás jelszót adott meg</p> :
          ''}
          <div className="signupText"></div>
            <div className="login_field">
              <FontAwesomeIcon icon={faUser} className="register-images"/>
              <input 
                type="text"
                value={name} 
                onChange={onChangeName}
                placeholder="Név"
                className={error === "Name" ? "register-input-red" : ""}>
              </input>
            </div>
            
            <div className="login_field">
              <FontAwesomeIcon icon={faEnvelope} className="register-images"/>
              <input 
                type="text"
                value={email} 
                onChange={onChangeEmail}
                placeholder="Email"
                className={error === "Email" ? "register-input-red" : ""}>
              </input>
            </div>
            
            <div className="login_field">
              <FontAwesomeIcon icon={faLock} className="register-images"/>
              <input 
                type="password"
                value={password} 
                onChange={onChangePassword}
                placeholder="Jelszó"
                className={error === "Password" ? "register-input-red" : ""}>
              </input>
            </div>
            
            <div className="login_field">
              <FontAwesomeIcon icon={faLock} className="register-images"/>
              <input 
                type="password"
                value={passwordConfirm} 
                onChange={onChangePasswordconfirm}
                placeholder="Jelszó ismét"
                className={error === "Password" ? "register-input-red" : ""}>
              </input>
            </div>

          <button className='register-button' onClick={onSubmit}>Regisztrálok</button>
      </div>
    );
      
  }

export default Register;