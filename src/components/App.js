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
import {Route, useHistory} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from '../utils/Auth';
import InfoTooltip from "./InfoTooltip";
///////////////////////////////////////////////////////////////////////////////////////
export default function App() {

    const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false)
    const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false)
    const [isEditProfilePopupOpen, setEditProfileClick] = useState(false)
    const [isImagePopupOpen, setImageClick] = useState(false)
    const [isDelConfirmPopupOpen, setIsDelConfirmPopupOpen] = useState(false)
    const [cardForDelete, setCardForDelete] = useState({});
    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false)
    const [userDate, setUserDate] = useState({
        email: '',
        password: '',
    });
    const [handleInfoToolTip, setHandleInfoToolTip] = useState(false)
    const [regResult, setRegResult] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory();
/////////////////////////
    function handleInfoToolTipOpen(){
        setHandleInfoToolTip(true)
    }

    function handleRegSubmit(regInfo){
        // e.preventDefault()
        // const {password, email } = regInfo;
        return Auth.register(regInfo.password, regInfo.email).then((res) => {
            if(res.ok) {
                handleInfoToolTipOpen();
                setMessage('Вы успешно зарегистрировались!')
                setRegResult(true);
                history.push('/sign-in')
            }else {
                setRegResult(false);
                setMessage('Что-то пошло не так!\n' +
                    'Попробуйте ещё раз.');
                handleInfoToolTipOpen();
            }
        });
    }
    function onClose(){
        setMessage('');
        setHandleInfoToolTip(false);
        setRegResult(false);
    }



    useEffect(()=>{
        tokenCheck();
    }, [])
    useEffect(()=>{
        if(loggedIn === true){
        history.push('/')}
    },[loggedIn])

    function handleLogin(userDate) {
        Auth.authorize(userDate.email, userDate.password).then((data) => {
                if(!data){
                    throw new Error('Что-то пошло не так!')}
                if (data){
                    setLoggedIn(true);
                   localStorage.setItem('jwt', data.token)
                    tokenCheck();
                    history.push('/');
                }
            })
    }

    function tokenCheck() {
        if(localStorage.getItem('jwt')){
            let jwt = localStorage.getItem('jwt');
            Auth.getContent(jwt).then((data)=>{
                if (data.data){

                    setLoggedIn(true);
                    setUserDate({email: data.data.email})
                }
            })
        }
        // let jwt = localStorage.getItem('jwt');
        // if (jwt === true){
        //     console.log(jwt)
        //     Auth.getContent(jwt).then((res) => {
        //         if (res) {
        //             handleLogin()
        //         }
        //         }
        //     )
        // }
    }



    function handleEditAvatarClick() {
            setEditAvatarClick(true)
        }
        function handleEditProfileClick() {
            setEditProfileClick(true)
        }
        function handleAddPlaceClick() {
            setAddPlaceClick(true)
        }
        function handleCardClick(card) {
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
        useEffect(() => {
            api.getUserServerInfo().then((res) => {
                setCurrentUser(res)
            }).catch((res) => {
                console.log(res.status)
            })
        }, []);
        useEffect(() => {
            api.getInitialCards().then((res) => {
                setCards(res)
            }).catch((err) => {
                console.log(err)
            })
        }, []);
        function handleCardLike(card) {
            const isLiked = card.likes.some(i => i._id === currentUser._id);
            api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
                setCards((prevCards) => prevCards.map((c) => c._id === card._id ? newCard : c));
            });
        }
        function handleCardDeleteClick(card) {
            setIsDelConfirmPopupOpen(true);
            setCardForDelete(card);
        }
        function handleCardDelete(card) {
            api.removeCard(card._id).then((res) => {
                setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
            })
                .then(() => closeAllPopups())
                .catch((res) => {
                    console.log(`Ошибка${res.status}`);
                });
        }
        function handleConfirmDelete(e) {
            e.preventDefault();
            handleCardDelete(cardForDelete);
            closeAllPopups();
        }
        function handleUpdateUser({name, description}) {
            api.setUserServerInfo({name: name, about: description}).then((res) => {
                setCurrentUser(res);
            }).then(() => closeAllPopups()).catch((res) => {
                console.log(`Ошибка ${res.status}`);
            });
        }
        function handleUpdateAvatar(link) {
            api.patchUserAvatar(link).then((res) => {
                setCurrentUser(res);
            }).then(() => closeAllPopups()).catch((res) => {
                console.log(`Ошибка ${res.status}`);
            });
        }
        function handleAddPlaceSubmit({name, link, f}) {
            api.addNewCard({name, link}).then((newCard) => {
                setCards([newCard, ...cards]);
            })
                .then(() => closeAllPopups())
                .then(() => f())
                .catch((res) => {
                    console.log(`Ошибка${res.status}`);
                });
        }
        return(
                <CurrentUserContext.Provider value={currentUser}>
                    <Header userData={userDate}/>
                    <Route path='/sign-in'> <Login onLogin={handleLogin} /></Route>
                    <Route path='/sign-up'><Register  openToolTip={handleInfoToolTipOpen} onSubmit={handleRegSubmit}/></Route>
                    <Route exact path='/'>
                        <ProtectedRoute exact path='/' userData={userDate} loggedIn={loggedIn} component={Main} onEditAvatar={handleEditAvatarClick}
                                        onCardClick={handleCardClick} onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick} onCardDelete={handleCardDeleteClick}
                                        onCardLike={handleCardLike} cards={cards}/>
                        <Footer/>
                        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                          onUpdateUser={handleUpdateUser}/>
                        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen}
                                         onClose={closeAllPopups}/>
                        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen}
                                       onClose={closeAllPopups}/>
                        <PopupWithForm name={`del`} title={'Вы уверены?'} onConfirm={handleConfirmDelete}
                                       isOpen={isDelConfirmPopupOpen} onClose={closeAllPopups}></PopupWithForm>
                        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>
                    </Route>
                    <InfoTooltip isOpen={handleInfoToolTip}  message={message} regResult={regResult} onClose={onClose}/>

                </CurrentUserContext.Provider>
        )
    }
