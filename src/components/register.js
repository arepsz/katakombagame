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
        passwordConfirm: ""
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
  
    onSubmit(e){
      console.log("pressed");
      e.preventDefault();
      
      const obj = {
        name: this.state.name,
        email:  this.state.email,
        password: this.state.password,
        passwordConfirm:  this.state.passwordConfirm
      }
  
      axios.post('http://localhost:8000/insert.php', obj)
      .then(res=> console.log(res.data))
      .catch(error => {
        console.log(error.response)
      
    }).finally(console.log("asd"))
    }
  
    render(){
      return (
        <div className="register" >
            <div className="signupText"></div>
              <div className="login_field">
                <FontAwesomeIcon icon={faUser} className="register-images"/>
                <input 
                  type="text"
                  value={this.state.name} 
                  onChange={this.onChangeName}
                  placeholder="Név">
                </input>
              </div>
              
              <div className="login_field">
                <FontAwesomeIcon icon={faEnvelope} className="register-images"/>
                <input 
                  type="text"
                  value={this.state.email} 
                  onChange={this.onChangeEmail}
                  placeholder="Email">
                </input>
              </div>
              
              <div className="login_field">
                <FontAwesomeIcon icon={faLock} className="register-images"/>
                <input 
                  type="password"
                  value={this.state.password} 
                  onChange={this.onChangePassword}
                  placeholder="Jelszó">
                </input>
              </div>
              
              <div className="login_field">
                <FontAwesomeIcon icon={faLock} className="register-images"/>
                <input 
                  type="password"
                  value={this.state.passwordConfirm} 
                  onChange={this.onChangePasswordconfirm}
                  placeholder="Jelszó ismét">
                </input>
              </div>

            <button className='register-button' onClick={this.onSubmit}>Regisztrálok</button>
        </div>
      );
    }
      
  }

export default Register;