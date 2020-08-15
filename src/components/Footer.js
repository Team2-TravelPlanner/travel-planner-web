import React from 'react';

class Footer extends React.Component {

  render() {
    const now = new Date();
    const year = now.getFullYear();

    return (
      <div className="app-footer">
        &copy; Copyright {year}, Travel Planner 
      </div>
    )
  }
}

export default Footer;