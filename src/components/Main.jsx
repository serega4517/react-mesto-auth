import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar"
             src={currentUser.avatar}
             alt="Фото профиля"
        />
        <button onClick={onEditAvatar}
                className="profile__avatar-edit-button"
                type="button"
        />
        <h1 className="profile__user-name">{currentUser.name}</h1>
        <button onClick={onEditProfile}
                className="profile__edit-button"
                type="button"
        />
        <p className="profile__user-job">{currentUser.about}</p>
        <button onClick={onAddPlace}
                className="profile__add-button"
                type="button"
        />
      </section>

      <section className="elements">
        {cards.map((card) => (
            <Card card={card}
                  key={card._id}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
            />
        ))}
      </section>
    </main>
  );
}

export default Main;