import PopupWithForm from "./PopupWithForm";
import React, {useRef} from "react";

export default function AddPlacePopup(props){

    const cardLink = useRef("");
    const cardTitle = useRef("");

    function clearInput(){
        cardTitle.current.value = ''
        cardLink.current.value= ''
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAddPlace({
            name: cardTitle.current.value,
            link: cardLink.current.value,
            f: clearInput,
        });
    };

    function handleOnClose(){
        clearInput();
        props.onClose();
}
    return(
    <PopupWithForm name={`cards-editor`} onSubmit={handleSubmit} title={'Новое место'} isOpen={props.isOpen} onClose={handleOnClose}>
        <input className="popup__place-name popup__input-field" ref={cardTitle} type="text" placeholder="Название" required name="name" autoComplete="off" minLength="2" maxLength="30" id="name-card" />
        <span id="name-card-error" className="popup__error"></span>
        <input className="popup__picture-link popup__input-field" ref={cardLink} type="url" placeholder="Ссылка на картинку" required name="link" autoComplete="off" id="link-place" />
        <span id="link-place-error" className="popup__error"></span>
    </PopupWithForm>
)
}