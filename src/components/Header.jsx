import React from "react";
import logo from '../images/header-logo.svg';
import {Link, Route, Switch} from "react-router-dom";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img className="header__logo"
           src={logo}
           alt="Логотип сервиса"
      />
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>

        <Route exact path="/">
          <div className="header__wrapper">
            <p className="header__user-email">{email}</p>
            <Link to="/sign-in" className="header__link" onClick={onLogout}>Выйти</Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;