import CurrentUserContext from "../contexts/CurrentUserContext";
import React, {useEffect, useState} from "react";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(name, about) {
    api.editProfile(name, about)
      .then((data) => {
        setCurrentUser(data);

        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);

        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((error) => {
        console.log(error);
      })

    closeAllPopups();
  }

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }
    document.addEventListener('keydown', handleEscClose)

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [])

  useEffect(() => {
    function handleOverlayClose(e) {
      if (e.target.classList.contains('popup_opened')) {
        closeAllPopups()
      }
    }
    document.addEventListener('click', handleOverlayClose)

    return () => {
      document.removeEventListener('click', handleOverlayClose)
    }
  }, [])

  useEffect(() => {
    api.getProfile()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
        />
        <Footer />
      </div>

      <EditProfilePopup onClose={closeAllPopups}
                        isOpen={isEditProfilePopupOpen}
                        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup onClose={closeAllPopups}
                     isOpen={isAddPlacePopupOpen}
                     onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup onClose={closeAllPopups}
                       isOpen={isEditAvatarPopupOpen}
                       onUpdateAvatar={handleUpdateAvatar}
      />

      <PopupWithForm
        title='Вы уверены?'
        name='card-remove'
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
