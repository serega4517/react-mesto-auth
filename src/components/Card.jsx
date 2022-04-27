import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__remove-button ${isOwn ? '' : 'element__remove-button_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="element">
      <img className="element__image"
           src={card.link}
           alt={card.name}
           onClick={handleClick}
      />
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName}
                  type="button"
                  onClick={handleLikeClick}
          />
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
        <button className={cardDeleteButtonClassName}
                type="button"
                onClick={handleDeleteClick}
        />
    </div>
  );
}

export default Card;