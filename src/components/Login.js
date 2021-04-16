import { useHistory } from 'react-router-dom';
import React, {useState} from 'react';
import * as Auth from '../utils/Auth.js';

const Login = (onLogin) => {
    const [ userData, setUserData] = useState({
        email: '',
        password: '',
    })
    // const [message, setMessage] = useState('')
    // const history = useHistory();

    function handleChange(e) {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
            onLogin.onLogin(userData)
                // .catch(err => console.log(err));
    }


        return(
            <div className="login">
                <p className="login__welcome">
                    Войти
                </p>
                <form onSubmit={handleSubmit} className="login__form">
                    <input id="username"  placeholder="Email" required name="email" type="email" value={userData.username} onChange={handleChange} />
                    <input id="password"  placeholder="Пароль"required name="password" type="password" value={userData.password} onChange={handleChange} />
                    <div className="login__button-container">
                        <button type="submit" className="login__link">Войти</button>
                    </div>
                </form>
            </div>
        )

}

export default Login;