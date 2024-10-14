import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import '../index.css'

const Main = () => {
    return (
        <div id="layout">
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;