import PopupWithForm from "./PopupWithForm";
import React, { createRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const inputAvatarRef = createRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar-edit'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__wrapper">
        <input className="popup__input popup__input_avatar-edit"
               id="avatar-input"
               placeholder="Ссылка на картинку"
               name="avatar"
               type="url"
               ref={inputAvatarRef}
               required
        />
        <span className="popup__input-error avatar-input-error" />
      </div>
      <button className="popup__save-button" type="submit">Сохранить</button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;