import React, {useState} from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(e) {
    let  { email, password } = formData;
    e.preventDefault();
    onRegister({ email, password })
  }

  return (
      <section className="authorization">
        <h1 className="authorization__title">Регистрация</h1>
        <form className="authorization__form"
              onSubmit={handleSubmit}
        >
          <input className="authorization__input"
                 type="email"
                 placeholder="Email"
                 name="email"
                 required
                 onChange={handleChange}
                 value={formData.email}
          />
          <input className="authorization__input"
                 type="password"
                 placeholder="Пароль"
                 name="password"
                 required
                 onChange={handleChange}
                 value={formData.password}
          />
          <button className="authorization__button"
                  href="#"
                  type="submit">Зарегистрироваться</button>
        </form>
        <Link to="/sign-in" className="authorization__link">Уже зарегистрированы? Войти</Link>
      </section>
  )
}

export default Register;