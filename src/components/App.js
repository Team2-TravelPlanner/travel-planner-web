import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login"

class App extends React.Component {
  state = { //states used to activated login or register form.
    isLoginForm: false,
    isRegisterForm: false
  }
//two call back functions used to get props from it's child(Header and Login)
  LoginCB = (isLoginData) => {
    this.setState({isLoginForm: isLoginData})
  }

  RegisterCB = (isRegisterData) => {
    this.setState({isRegisterForm: isRegisterData})
  }

  render() {
    return (
      <div class="app">
        <Header isLoginData = {this.LoginCB}
                isRegisterData = {this.RegisterCB}/>

        <Login isLoginForm={this.state.isLoginForm} 
               isLoginData = {this.LoginCB}
               isRegisterForm={this.state.isRegisterForm} 
               isRegisterData = {this.RegisterCB}/>
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App;