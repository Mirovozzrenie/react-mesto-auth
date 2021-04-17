import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React, {useContext, useEffect, useState} from "react";

export default function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            description
        });
    }


    return (
        <PopupWithForm name={`profile-editor`} title={'Редактировать профиль'} isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="popup__user-name popup__input-field" onChange={handleChangeName} value={name || ""}
                   type="text" placeholder="Фамилия" required
                   name="name" autoComplete="off" minLength="2" maxLength="40" id="user-name"/>
            <span id="user-name-error" className="popup__error"></span>
            <input className="popup__user-status popup__input-field" onChange={handleChangeDescription}
                   value={description || ""} type="text" placeholder="Статус" required
                   name="status" autoComplete="off" minLength="2" maxLength="200" id="user-status"/>
            <span id="user-status-error" className="popup__error"></span>
        </PopupWithForm>
    )
}