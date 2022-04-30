import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(name, link);

    setName('');
    setLink('');
  }


  return (
    <PopupWithForm
      title='Новое место'
      name='new-card'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="input-container">
        <input className="popup__input popup__input_type_title"
               id="place-input"
               placeholder="Название"
               name="name"
               type="text"
               minLength="2"
               maxLength="30"
               onChange={handleChangeName}
               value={name}
               required
        />
        <span className="popup__input-error place-input-error" />
      </div>
      <div className="input-container">
        <input className="popup__input popup__input_type_link"
               id="link-input"
               placeholder="Ссылка на картинку"
               name="link"
               type="url"
               onChange={handleChangeLink}
               value={link}
               required
        />
        <span className="popup__input-error link-input-error" />
      </div>
      <button className="popup__save-button" type="submit">Сохранить</button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;