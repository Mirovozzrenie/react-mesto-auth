import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card(props) {
    function handleCardClick(){ props.onCardClick(props.card) };
    function handleLikeClick(){ props.onCardLike(props.card) };
    const currentUser = useContext(CurrentUserContext);
    function handleDeleteClick(){ props.onCardDelete(props.card) };
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardDeleteButtonClassName = (
        `elements__remove-btn ${isOwn ? '' : 'elements__remove-btn_condition_disabled'}`
    );
    const cardLikeButtonClassName = (
        `elements__like ${isLiked? 'elements__like_condition_on':''}`
    );

    return (
  <div className="elements__card">
                  <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
                         <img src={props.card.link} alt="#" className="elements__picture"  onClick={handleCardClick}/>
                                <div className="elements__place-panel">
                                    <h2 className="elements__name">{props.card.name}</h2>
                                    <div className="elements__like-conteiner">
                                        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                                        <p className="elements__like-counter">{props.card.likes.length}</p>
                                    </div>
                                </div>
                            </div>
                        )
}