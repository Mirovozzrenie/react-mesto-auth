import { Link, useHistory } from 'react-router-dom';
import * as Auth from '../utils/Auth';
import React, {useState, } from "react";
// import CurrentUserLogin from '../contexts/CurrentUserLogIn'
const Register = () => {

    const [regInfo, setRegInfo] = useState({email: '', pssword: '',})
    const [message, setMessage] = useState('');
    const history = useHistory();

   function handleChange(e) {
        const {name, value} = e.target;
       setRegInfo({
           ...regInfo,
            [name]: value
        });
    }

   function handleSubmit(e){
        e.preventDefault()
            const {password, email } = regInfo;
            Auth.register(password, email).then((res) => {
                if(res.statusCode !== 400) {
                    history.push('/sign-in')
                }else {
                    setMessage('Что-то пошло не так!');
                }
            });
    }
    {
        return(
            <div className="register">
                <p className="register__welcome">
                    Регистрация
                </p>
                <form onSubmit={handleSubmit} className="register__form">
                    <input id="email" name="email" type="email" value={regInfo.email} onChange={handleChange} />
                    <input id="password" name="password" type="password" value={regInfo.password} onChange={handleChange} />
                    <div className="register__button-container">
                        <button type="submit" className="register__link">Зарегистрироваться</button>
                    </div>
                </form>
                <div className="register__signin">
                    <p>Уже зарегистрированы?</p>
                    <Link to="login" className="register__login-link">Войти</Link>
                </div>
            </div>
        )
    }
}

export default Register;
