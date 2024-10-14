import { NavLink } from "react-router-dom";
import "../index.css";
import { PiBooksDuotone } from "react-icons/pi";

const NavBar = () => {
  return (
    <div id="navbar">
      <div className="title"><PiBooksDuotone className="title-icon"/><h2>Book Store</h2></div>
      <div className="nav-item-container">
        <NavLink className={"nav-item"} to={"/"}>
          Home
        </NavLink>
        <NavLink className={"nav-item"} to={"/wishList"}>
          Wished List
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
