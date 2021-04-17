import {NavLink, Route, useHistory} from "react-router-dom";

export default function NavBar(props) {

    const history = useHistory();

    function logOut() {
        localStorage.removeItem('jwt')
        history.push('/sign-in')
    }

    return (
        <nav className='header__navbar'>
            <Route exact path='/'><p className='userEmail'>{props.userData.email || ''}</p></Route>
            <Route exact path='/'><NavLink onClick={logOut} className='header__navbar__link header__navbar__link-exit'
                                           to="/sign-in"><p>Выйти</p></NavLink></Route>
            <Route path='/sign-in'><NavLink className='header__navbar__link' to="/sign-up"><p>Регистрация</p></NavLink></Route>
            <Route path='/sign-up'><NavLink className='header__navbar__link' to="/sign-in"><p>Войти</p>
            </NavLink></Route>
        </nav>
    )
}