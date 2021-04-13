import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import {BrowserRouter, Route} from 'react-router-dom';
function App() {

    function handleEditAvatarClick() {
    setEditAvatarClick(true)
        console.log(isEditAvatarPopupOpen)
    }
    function handleEditProfileClick() {
        setEditProfileClick(true)
    }
    function handleAddPlaceClick() {
        setAddPlaceClick(true)
    }
    function handleCardClick(card){
        setImageClick(true);
        setSelectedCard(card);
    }
    const closeAllPopups = () => {
        setEditAvatarClick(false);
        setAddPlaceClick(false);
        setEditProfileClick(false);
        setImageClick(false);
        setIsDelConfirmPopupOpen(false);
        setCardForDelete({});
    }

    const [isEditAvatarPopupOpen, setEditAvatarClick ] = React.useState(false)
    const [isAddPlacePopupOpen, setAddPlaceClick ] = useState(false)
    const [isEditProfilePopupOpen, setEditProfileClick ] = useState(false)
    const [isImagePopupOpen, setImageClick ] = useState(false)
    const [isDelConfirmPopupOpen, setIsDelConfirmPopupOpen] = useState(false)
    const [cardForDelete, setCardForDelete] = useState({});
    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([]);



    useEffect(()=>{api.getUserServerInfo().then((res)=>{setCurrentUser(res)}).catch((res)=>{
        console.log(res.status)
    })}, []);


    useEffect(()=>{
        api.getInitialCards().then((res)=>{setCards(res)}).catch((err)=>{console.log(err)})
    },[]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((prevCards) => prevCards.map((c) => c._id === card._id ? newCard : c));
        });
    }
    function handleCardDeleteClick(card){
        setIsDelConfirmPopupOpen(true);
        setCardForDelete(card);
    };

    function handleCardDelete(card){
        api.removeCard(card._id).then((res) => {
            setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
            })
            .then(() => closeAllPopups())
            .catch((res) => {
                console.log(`Ошибка${res.status}`);
            });
    };

    function handleConfirmDelete(e){
        e.preventDefault();
        handleCardDelete(cardForDelete);
        closeAllPopups();
    };

    function handleUpdateUser({name, description}){
        api.setUserServerInfo({ name: name, about: description }).then((res) => {
                setCurrentUser(res);
            }).then(() => closeAllPopups()).catch((res) => {
                console.log(`Ошибка ${res.status}`);
            });
    };

    function handleUpdateAvatar(link){
        api.patchUserAvatar(link).then((res) => {
              setCurrentUser(res);
            }).then(() => closeAllPopups()).catch((res) => {
                console.log(`Ошибка ${res.status}`);
            });
    };
    function handleAddPlaceSubmit({ name, link, f}){
        api.addNewCard({ name, link }).then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .then(() => closeAllPopups())
            .then(() => f())
            .catch((res) => {
                console.log(`Ошибка${res.status}`);
            });
    };

    return (
        <BrowserRouter>
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
        <Route path='/sign-in' component={Login} />
        <Route path='/sign-up' component={Register} />
        <Route exact path='/'>
        <Main cards={cards} onCardDelete={handleCardDeleteClick} onCardLike={handleCardLike} onEditProfile={handleEditProfileClick}  onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit}  isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
        <PopupWithForm name={`del`} title={'Вы уверены?'} onConfirm={handleConfirmDelete} isOpen={isDelConfirmPopupOpen} onClose={closeAllPopups}></PopupWithForm>
        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>
        </Route>
       </CurrentUserContext.Provider>
        </BrowserRouter>
)}

export default App;
