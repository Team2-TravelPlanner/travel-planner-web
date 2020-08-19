import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login"

class App extends React.Component {
  state = { //states used to activated login or register form.
    isLoginForm: false,
    isRegisterForm: false,
    LoginStatus: false,
  }
//two call back functions used to get props from it's child(Header and Login)
  LoginCB = (isLoginData) => {
    this.setState({isLoginForm: isLoginData})
  }

  RegisterCB = (isRegisterData) => {
    this.setState({isRegisterForm: isRegisterData})
  }
  LoginStatusCB = (loginStatus) => {
    this.setState({LoginStatus : loginStatus})
  }
  LogOutCB = (LogOutData) => {
    this.setState({LoginStatus : false})
  }
  render() {
    return (
      <div class="app">
        <Header isLoginData = {this.LoginCB}
                isRegisterData = {this.RegisterCB}
                isLogin = {this.state.LoginStatus}
                LogOutData = {this.LogOutCB}
                />
        <Login isLoginForm={this.state.isLoginForm} 
               isLoginData = {this.LoginCB}
               isRegisterForm={this.state.isRegisterForm} 

               isRegisterData = {this.RegisterCB}
               loginStatus = {this.LoginStatusCB}
               />        
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App;