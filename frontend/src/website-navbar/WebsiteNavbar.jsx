import React from 'react';

const WebsiteNavbar = () => {
  return (
    <div className="website-navbar">
      <div className="website-navbar-logo">
        <img src="/path-to-your-logo.png" alt="iBRAIN" className="web-logo" />
        <div className="logo-text">
          <p>International Institute for the Brain</p>
          <p>International Center for the Brain</p>
        </div>
      </div>
      <div className="website-navbar-links">
        <div className="web-nav-item">Academy</div>
        <div className="web-nav-item selected">Institute</div>
        <div className="web-nav-item">Clinic Center</div>
        <div className="web-nav-item">News & Events</div>
        <div className="web-nav-item">About Us</div>
      </div>
      <div className="website-navbar-search">
        <span className="search-icon">&#128269;</span> {/* Unicode for search icon */}
      </div>
      <div className="website-navbar-submenu">
        <div className="submenu-item">Research Pipeline</div>
        <div className="submenu-item">Professional Development</div>
        <div className="submenu-item">Guest Speaker Program</div>
        <div className="submenu-item">Publications</div>
      </div>
    </div>
  );
};

export default WebsiteNavbar;
