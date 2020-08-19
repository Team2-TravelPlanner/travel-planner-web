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
  handleLogOut = () => {
    this.props.LogOutData(true);
  }
  showMenu = () => {
    if (this.props.isLogin) {
      return <div>
        <Dropdown.Item class="dropdown-item" type="button" onClick={this.handleLogin}>Saved Trip</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item class="dropdown-item" type="button" onClick={this.handleLogOut}>Sign out</Dropdown.Item>
      </div>
    }
    else {
      return <div>
        <Dropdown.Item class="dropdown-item" type="button" onClick={this.handleLogin}>Sign in</Dropdown.Item>
        <Dropdown.Item class="dropdown-item" type="button" onClick={this.handleRegister}>Sign up</Dropdown.Item>
      </div>
    }
  }
  render() {
    return (
      <div class="app-header">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">
            Planner
          </a>
        </nav>
        <div class="DropDown">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic-button">
              {<img className="avatar"
                src={avatar}
                alt="user pic"
              />}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.showMenu()}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default Header;