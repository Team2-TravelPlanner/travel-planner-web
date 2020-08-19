import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap'
import avatar from "../assets/images/user_ava.png";

class Header extends React.Component {
  handleLogin = () => {
    this.props.isLoginData(true);
  };
  handleRegister = () => {
    this.props.isRegisterData(true);
  };
  render() {
    return (
      <div class="app-header">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">
            Planner
          </a>
        </nav>
        <div class="DropDown">
          <DropdownButton id="dropdown-basic-button" title={
              <img className="avatar"
                src={avatar}
                alt="user pic"
              />
          }>
            <Dropdown.Item class="dropdown-item" type="button" onClick={this.handleLogin}>Sign in</Dropdown.Item>
            <Dropdown.Item class="dropdown-item" type="button" onClick={this.handleRegister}>Sign up</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    )
  }
}

export default Header;