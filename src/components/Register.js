import { Link } from 'react-router-dom';
import React, {useState, } from "react";
const Register = (props) => {
    const [regInfo, setRegInfo] = useState({email: '', password: '',})
   function handleChange(e) {
        const {name, value} = e.target;
       setRegInfo({
           ...regInfo,
            [name]: value
        });
    }

   function handleSubmit(event){
        event.preventDefault()
       props.onSubmit(regInfo);
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
            </div>
        )
}

export default Register;
