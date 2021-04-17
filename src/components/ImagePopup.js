export default function ImagePopup(props) {
    const imagePopupClassNames = `popup popup_zoom ${
        props.isOpen ? "popup_active" : ""
    }`;

    return (
        <div className={imagePopupClassNames} onClick={props.onClose}>
            <figure className="popup__zoom-container">
                <button className="popup__cancel-icon popup__zoom-cancel" onClick={props.onClose}></button>
                <img src={props.card.link} alt={props.card.name} className="popup__zoom-img"/>
                <figcaption className="popup__zoom-caption">{props.card.name}
                </figcaption>
            </figure>
        </div>
    )
}