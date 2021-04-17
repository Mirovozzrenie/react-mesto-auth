import React, {useState} from 'react';

const Login = (onLogin) => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin.onLogin(userData)
    }

    return (
        <div className="login">
            <p className="login__welcome">
                Войти
            </p>
            <form onSubmit={handleSubmit} className="login__form">
                <input id="username" className='login__input' placeholder="Email" required name="email" type="email"
                       value={userData.username} onChange={handleChange}/>
                <input id="password" className='login__input' placeholder="Пароль" required name="password"
                       type="password" value={userData.password} onChange={handleChange}/>
                <div className="login__button-container">
                    <button type="submit" className="login__button">Войти</button>
                </div>
            </form>
        </div>
    )
}

export default Login;