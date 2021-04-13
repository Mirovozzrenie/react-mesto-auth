import {BrowserRouter, NavLink, Route} from "react-router-dom";

export default function NavBar(props) {
    return (
            <nav className='header__navbar'>
                <Route exact path='/'><NavLink className='header__navbar__link' to="/sign-in"><p>exit</p></NavLink></Route>
                <Route path='/sign-in'><NavLink className='header__navbar__link' to="/sign-up"><p>sign-in</p></NavLink></Route>
                <Route path='/sign-up'><NavLink className='header__navbar__link' to="/sign-in"><p>sign-up</p></NavLink></Route>
            </nav>
    )
}