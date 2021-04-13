export default function PopupWithForm(props) {
    const popupOpenClassName = `${props.isOpen ? "popup_active" : ""}`;
    return(
    <div className={`popup popup_${props.name} ${popupOpenClassName}`}>
        <div className="popup__container">
             <button className="popup__cancel-icon popup__cancel-cards" type="button" onClick={props.onClose}></button>
            <form className="popup__edit-form" name={props.name} onSubmit={props.onSubmit}>
                      <h2 className="popup__action-name">{props.title}</h2>
                {props.children}
                       <button className="popup__save-button popup__save-profile" type="submit" onClick={props.onConfirm}>Сохранить</button>
            </form>
        </div>
    </div>
)
}
