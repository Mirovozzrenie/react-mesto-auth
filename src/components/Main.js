import React, {useContext} from "react";
import Card from './Card'
import {CurrentUserContext} from "../contexts/CurrentUserContext";


export default function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img alt="Аватар пользователя" className="profile__avatar" src={currentUser.avatar}/>
                    <button type="button" className="profile__avatar-btn" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__user-name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__user-status">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => {
                    return <Card key={card._id} onCardDelete={props.onCardDelete} card={card}
                                 onCardClick={props.onCardClick} onCardLike={props.onCardLike}></Card>
                })}
            </section>
        </main>
    )


}
