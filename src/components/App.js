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
  loginCB = (isLoginData) => {
    this.setState({isLoginForm: isLoginData})
  }

  registerCB = (isRegisterData) => {
    this.setState({isRegisterForm: isRegisterData})
  }

  loginStatusCB = (loginStatus) => {
    this.setState({LoginStatus : loginStatus})
  }

  logOutCB = (LogOutData) => {
    this.setState({LoginStatus : false})
  }

  render() {
    return (
      <div className="app">
        <Header isLoginData = {this.loginCB}
                isRegisterData = {this.registerCB}
                isLogin = {this.state.LoginStatus}
                LogOutData = {this.logOutCB}
                />
        <Login isLoginForm={this.state.isLoginForm} 
               isLoginData = {this.loginCB}
               isRegisterForm={this.state.isRegisterForm} 
               isRegisterData = {this.registerCB}
               loginStatus = {this.loginStatusCB}
               />        
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App;