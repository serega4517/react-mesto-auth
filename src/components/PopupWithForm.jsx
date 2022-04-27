import React from "react";

function PopupWithForm({name, title, isOpen, onClose, children, onSubmit}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form popup__form-profile"
              name={name}
              autoComplete="off"
              noValidate
              onSubmit={onSubmit}
        >
          {children}
          <button className="popup__save-button" type="submit">Сохранить</button>
        </form>
        <button onClick={onClose}
                className="popup__close-button"
                type="button"
        />
      </div>
    </div>
  );
}

export default PopupWithForm;