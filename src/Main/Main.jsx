import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import '../index.css'
import Footer from "../Components/Footer";

const Main = () => {
    return (
        <div id="layout">
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;