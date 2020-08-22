import React from 'react';
import { Dropdown } from 'react-bootstrap'
import avatar from "../assets/images/user.svg";
import { Link } from "react-router-dom";

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
        <Dropdown.Item className="dropdown-item" type="button" onClick={this.handleLogOut}>Log out</Dropdown.Item>
      </div>
    }
    else {
      return <div>
        <Dropdown.Item className="dropdown-item" type="button" onClick={this.handleLogin}>Log in</Dropdown.Item>
        <Dropdown.Item className="dropdown-item" type="button" onClick={this.handleRegister}>Register</Dropdown.Item>
      </div>
    }
  }
  
  customToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  render() {
    return (
      <div className="app-header">
        <Link to="/" className="logo">
          NYC Travel planner
        </Link>
        <div className="DropDown">
          <Dropdown>
            <Dropdown.Toggle as={this.customToggle} id="dropdown-custom-components">
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
