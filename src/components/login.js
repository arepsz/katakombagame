import React from 'react';
import { useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

function Login({trigger, setTrigger}) {
    const [email, setEmail] = useState("");  
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [error, setError] = useState("");

    const onChangeEmail = (e) => {
      setEmail(e.target.value);
    };
     
    const onChangePassword = (e) => {
      setPassword(e.target.value);
    };

    const handleStatus = (json) => {
      let error = "";
      let success = false;
      if(json['status'] === 400) {
        localStorage.setItem('user-name', json['name']);
        localStorage.setItem('user-email', json['email']);
        success = true;
      }else if(json['status'] === 404){
        error = json['fail'];
      }
      setSuccess(success);
      setError(error);
      setShowMessage(true);
      setPassword("");
      setTrigger(true);
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
      const obj = {
        email:  email,
        password: password
      }
      axios.post('http://localhost:8000/login.php', obj)
      .then(res=> handleStatus(res.data))
      .catch(error => {
        console.log(error.response)
      })
    };
  
    return (
        <div className="register" >
            {showMessage ?
            <p className={success ? "register-message-green" : "register-message-red"}>{success ? "Sikeres" : "Sikertelen"} bejelentkezés</p> :
            ''}
            {error === "Email" ?
            <p className="error-message-red">Hibás emailt adott meg</p> :
            ''}
            {error === "Password" ?
            <p className="error-message-red">Hibás jelszót adott meg</p> :
            ''}
            <div className="signupText"></div>
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

            <button className='register-button' onClick={onSubmit}>Bejelentkezek</button>
        </div>
      );
      
  }

export default Login;