import { Link, useHistory } from 'react-router-dom';
import * as Auth from '../utils/Auth';
import React, {useState, } from "react";
import InfoTooltip from "./InfoTooltip";
const Register = (props) => {
    const [regInfo, setRegInfo] = useState({email: '', password: '',})
    // const [message, setMessage] = useState('');
    // const history = useHistory();
    // const [regResult, setRegResult] = useState(false);
    // const [handleInfoToolTip, setHandleInfoToolTip] = useState(false)

    // function onClose(){
    //     setMessage('');
    //     props.onClose();
    //     setRegResult(false);
    // }

    // function handleInfoToolTipOpen(){
    //     props.openToolTip();
    // }

   function handleChange(e) {
        const {name, value} = e.target;
       setRegInfo({
           ...regInfo,
            [name]: value
        });
    }

   function handleSubmit(event){
        event.preventDefault()
            // const {password, email } = regInfo;
       props.onSubmit(regInfo);
       //        return Auth.register(password, email).then((res) => {
   //              if(res.ok) {
   //                  handleInfoToolTipOpen();
   //                  setMessage('Вы успешно зарегистрировались!')
   //                  setRegResult(true);
   //                  history.push('/sign-in')
   //              }else {
   //                  setRegResult(false);
   //                  setMessage('Что-то пошло не так!\n' +
   //                      'Попробуйте ещё раз.');
   //                  handleInfoToolTipOpen();
   //              }
   //          });
    }


        return(
            <div className="register">
                <p className="register__welcome">
                    Регистрация
                </p>
                <form onSubmit={handleSubmit} className="register__form">
                    <input id="email" placeholder='Email' className='register__input' name="email" type="email" value={regInfo.email} onChange={handleChange} />
                    <input id="password" placeholder='Password' className='register__input' name="password" type="password" value={regInfo.password} onChange={handleChange} />
                    <div className="register__button-container">
                        <button type="submit"  className="register__button">Зарегистрироваться</button>
                    </div>
                </form>
                <div className="register__signature">
                    <p className='register__question'>Уже зарегистрированы?</p>
                    <Link className='register__link-to-enter' to="/sign-in">Войти</Link>
                </div>
                {/*<InfoTooltip isOpen={handleInfoToolTip}  message={message} regResult={regResult} onClose={onClose}/>*/}
            </div>
        )

}

export default Register;
