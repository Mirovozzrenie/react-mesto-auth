import success from "../images/info-tool-tip/success.png";
import failure from "../images/info-tool-tip/ failure.png";

export default function InfoTooltip(props) {
    const toolTipOpenClassName = `${props.isOpen ? "info-tool-tip_active" : ""}`;


    return (
        <div className={`info-tool-tip ${toolTipOpenClassName}`}>
            <div className="info-tool-tip__container">
                <button onClick={props.onClose} className="info-tool-tip__button" type="button"></button>
                <div className='info-tool-tip__content'>
                    <img className='info-tool-tip__img' src={props.regResult ? success : failure} alt=""/>
                    <p className='info-tool-tip__text'>{props.message}</p>
                </div>
            </div>
        </div>
    )
}