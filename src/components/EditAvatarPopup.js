import PopupWithForm from "./PopupWithForm";
import React, {useRef} from "react";

export default function EditAvatarPopup(props) {

    const avaRef = useRef();


    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avaRef.current.value,
        });
        avaRef.current.value = "";
    }

    return (
        <PopupWithForm name={`change-avatar`} title={'Обновить аватар'} onConfirm={handleSubmit} isOpen={props.isOpen}
                       onClose={props.onClose}>
            <input ref={avaRef} className="popup__avatar-link popup__input-field" type="url"
                   placeholder="Ссылка на картинку" required name="avatar" autoComplete="off" id="link-avatar"/>
            <span id="link-avatar-error" className="popup__error"></span>
        </PopupWithForm>
    )
}