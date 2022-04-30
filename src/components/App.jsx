import CurrentUserContext from "../contexts/CurrentUserContext";
import { Route, Switch, useHistory } from "react-router-dom";
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
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/api-auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();

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
    setIsSuccessRegister(false);
    setIsInfoTooltipOpen(false);
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

  function handleRegister({ email, password }) {
    return auth.register(email, password)
      .then((res) => {
        if (res.data._id) {
          setIsSuccessRegister(true);
          setIsInfoTooltipOpen(true);
          history.push('/sign-in');
        }
      })
      .catch((error) => {
        console.log(error);

        setIsSuccessRegister(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function handleLogin({ email, password }) {
    return auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
          return res;
        }
      })
      .catch((error) => {
        console.log(error);

        setIsSuccessRegister(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(true);
    history.push('/sign-in');
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkValidToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [history]);

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
        <Header email={email} onLogout={handleLogout} loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute exact path="/"
                          loggedIn={loggedIn}
                          component={Main}
                          cards={cards}
                          onCardLike={handleCardLike}
                          onCardClick={handleCardClick}
                          onCardDelete={handleCardDelete}
                          onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick}
                          onEditProfile={handleEditProfileClick}
          />

          <Route  path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route  path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
        </Switch>

        <Footer />

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

        <InfoTooltip isSuccess={isSuccessRegister}
                     isOpen={isInfoTooltipOpen}
                     onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
