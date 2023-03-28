import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.onChangeEmail= this.onChangeEmail.bind(this);
      this.onChangePassword= this.onChangePassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        email: "",
        password: "",
        success: false,
        loggedInUser: ""
      }
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

  
    onSubmit(e){
      console.log("pressed");
      /*e.preventDefault();
      
      const obj = {
        username: this.state.name,
        email:  this.state.email,
        password: this.state.password,
        passwordConfirm:  this.state.passwordConfirm
      }
      axios.post('http://localhost:8000/insert.php', obj)
      .then(res=> console.log(res.data))
      .catch(error => {
        console.log(error.response)
      
      }).finally(console.log("asd"))*/
    }
  
    render(){
      return (
        <div className="register" >
            <div className="signupText"></div>
              
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

            <button className='register-button' onClick={this.onSubmit}>Bejelentkezek</button>
        </div>
      );
    }
      
  }

export default Login;