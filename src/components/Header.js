import logo from "../images/header/header__logo.svg";
import NavBar from "./NavBar";

export default function Header(props) {
    return (

        <header className="header">
            <img src={logo} alt="Место: Россия"/>
            <NavBar userData={props.userData}/>
        </header>


    )
}