import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ infoToolTipStatus, onClose }) {
  return (
    <div className={infoToolTipStatus.open ? "popup info-tooltip popup_opened" : "popup popup_type_info-tooltip"}>
      <div className="popup__container">
        <img className="info-tooltip__image"
           src={infoToolTipStatus.status ? success : fail}
           alt={infoToolTipStatus.status ? "Изображение успешной регистрации" : "Изображение неудачной регистрации"} />
        <h2 className="info-tooltip__title">{infoToolTipStatus.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        <button className="popup__close-button"
                type="button"
                onClick={onClose}
        />
      </div>
    </div>
  )
}

export default InfoTooltip;