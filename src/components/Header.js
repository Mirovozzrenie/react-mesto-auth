import logo from "../images/header/header__logo.svg";
import NavBar from "./NavBar";
export default function Header(){
    return (

        <header className="header">
            <img  src={logo} alt="Место: Россия" />
            <NavBar />
        </header>


    )
}