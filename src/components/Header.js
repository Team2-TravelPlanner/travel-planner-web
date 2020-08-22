import React from 'react';
import { Dropdown } from 'react-bootstrap'
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
        <Dropdown.Item className="dropdown-item" type="button" onClick={this.handleLogin}>Saved Trip</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className="dropdown-item" type="button" onClick={this.handleLogOut}>Sign out</Dropdown.Item>
      </div>
    }
    else {
      return <div>
        <Dropdown.Item className="dropdown-item" type="button" onClick={this.handleLogin}>Sign in</Dropdown.Item>
        <Dropdown.Item className="dropdown-item" type="button" onClick={this.handleRegister}>Sign up</Dropdown.Item>
      </div>
    }
  }

  render() {
    return (
      <div className="app-header">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Planner
          </a>
        </nav>
        <div className="DropDown">
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