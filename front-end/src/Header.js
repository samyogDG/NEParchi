import React from "react";
import logo from "./assets/logo2.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <a href="http://localhost:3000/">
          <img src={logo} alt="Neparchi Logo" className="logo" />
        </a>
      </div>
    </header>
  );
}

export default Header;
