import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ isSuccess, isOpen, onClose }) {
  return (
    <div className={isOpen ? "popup info-tooltip popup_opened" : "popup popup_type_info-tooltip"}>
      <div className="popup__container">
        <img className="info-tooltip__image"
           src={isSuccess ? success : fail}
           alt={isSuccess ? "Изображение успешной регистрации" : "Изображение неудачной регистрации"} />
        <h2 className="info-tooltip__title">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        <button className="popup__close-button"
                type="button"
                onClick={onClose}
        />
      </div>
    </div>
  )
}

export default InfoTooltip;