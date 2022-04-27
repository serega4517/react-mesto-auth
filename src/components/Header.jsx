import React from "react";
import logo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo"
           src={logo}
           alt="Логотип сервиса"
      />
    </header>
  );
}

export default Header;