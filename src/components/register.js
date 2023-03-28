import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.onChangeName= this.onChangeName.bind(this);
      this.onChangeEmail= this.onChangeEmail.bind(this);
      this.onChangePassword= this.onChangePassword.bind(this);
      this.onChangePasswordconfirm= this.onChangePasswordconfirm.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        success: false,
        showMessage: false,
        error: ""
      }
    }
  
    onChangeName(e){
      this.setState({
        name: e.target.value
      });
    }
     
    onChangeEmail(e){
      this.setState({
        email:  e.target.value
      });
    }
     
    onChangePassword(e){
      this.setState({
        password: e.target.value
      });
    }
     
    onChangePasswordconfirm(e){
      this.setState({
        passwordConfirm:  e.target.value
      });
    }

    handleStatus(json) {
      let error = "";
      let success = false;
      if(json['status'] === 400) {
        success = true;
      }else if(json['status'] === 404){
        error = json['fail'];
      }
      this.setState({
        success: success,
        error: error,
        showMessage: true,
        password: "",
        passwordConfirm: ""
      });
    }
  
    onSubmit(e){
      e.preventDefault();
      const obj = {
        username: this.state.name,
        email:  this.state.email,
        password: this.state.password,
        passwordConfirm:  this.state.passwordConfirm
      }
      axios.post('http://localhost:8000/register.php', obj)
      .then(res=> this.handleStatus(res.data))
      .catch(error => {
        console.log(error.response)
      })
    }
  
    render(){
      return (
        <div className="register" >
            {this.state.showMessage ?
            <p className={this.state.success ? "register-message-green" : "register-message-red"}>{this.state.success ? "Sikeres" : "Sikertelen"} regisztráció</p> :
            ''}
            {this.state.error === "Duplicate" ?
            <p className="error-message-red">Már létezik felhasználó <br></br> ilyen felhasználó</p> :
            ''}
            {this.state.error === "Email" ?
            <p className="error-message-red">Hibás emailt adott meg</p> :
            ''}
            {this.state.error === "Password" ?
            <p className="error-message-red">Hibás jelszót adott meg</p> :
            ''}
            <div className="signupText"></div>
              <div className="login_field">
                <FontAwesomeIcon icon={faUser} className="register-images"/>
                <input 
                  type="text"
                  value={this.state.name} 
                  onChange={this.onChangeName}
                  placeholder="Név"
                  className={this.state.error === "Name" ? "register-input-red" : ""}>
                </input>
              </div>
              
              <div className="login_field">
                <FontAwesomeIcon icon={faEnvelope} className="register-images"/>
                <input 
                  type="text"
                  value={this.state.email} 
                  onChange={this.onChangeEmail}
                  placeholder="Email"
                  className={this.state.error === "Email" ? "register-input-red" : ""}>
                </input>
              </div>
              
              <div className="login_field">
                <FontAwesomeIcon icon={faLock} className="register-images"/>
                <input 
                  type="password"
                  value={this.state.password} 
                  onChange={this.onChangePassword}
                  placeholder="Jelszó"
                  className={this.state.error === "Password" ? "register-input-red" : ""}>
                </input>
              </div>
              
              <div className="login_field">
                <FontAwesomeIcon icon={faLock} className="register-images"/>
                <input 
                  type="password"
                  value={this.state.passwordConfirm} 
                  onChange={this.onChangePasswordconfirm}
                  placeholder="Jelszó ismét"
                  className={this.state.error === "Password" ? "register-input-red" : ""}>
                </input>
              </div>

            <button className='register-button' onClick={this.onSubmit}>Regisztrálok</button>
        </div>
      );
    }
      
  }

export default Register;