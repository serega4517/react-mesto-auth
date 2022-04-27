import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_fullscreen-image ${card.name ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <img className="popup__image"
             src={card.link}
             alt={card.name} />
        <p className="popup__image-description" />
        <button className="popup__close-button popup__close-button_fullscreen-image"
                type="button"
                onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;