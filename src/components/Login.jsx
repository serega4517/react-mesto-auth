import React, {useState} from "react";

function Login({ onLogin }) {
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
    e.preventDefault();
    onLogin(formData)
  }

  return (
      <section className="authorization">
        <h1 className="authorization__title">Вход</h1>
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
          <button className="authorization__button" href="#" type="submit">Войти</button>
        </form>
      </section>
  )
}

export default Login;