import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(name, description);
  }

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [isOpen]);

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='profile'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="input-container">
        <input className="popup__input popup__input_type_name"
               id="name-input"
               placeholder="Имя"
               name="name"
               type="text"
               minLength="2"
               maxLength="40"
               value={name}
               onChange={handleChangeName}
               required
        />
        <span className="popup__input-error name-input-error" />
      </div>
      <div className="input-container">
        <input className="popup__input popup__input_type_job"
               id="job-input"
               placeholder="Профессия"
               name="job"
               type="text"
               minLength="2"
               maxLength="200"
               value={description}
               onChange={handleChangeDescription}
               required
        />
        <span className="popup__input-error job-input-error" />
      </div>
    </ PopupWithForm>
  )
}

export default EditProfilePopup;