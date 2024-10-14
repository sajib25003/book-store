import { NavLink } from "react-router-dom";
import '../index.css'

const NavBar = () => {
    return (
        <div id="navbar">
            <NavLink className={'nav-item'} to={"/"}>Home</NavLink>
            <NavLink className={'nav-item'} to={"/wishList"}>Wished List</NavLink>
            
        </div>
    );
};

export default NavBar;