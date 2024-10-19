import { NavLink } from "react-router-dom";
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div id="container">
        <div id="error-img">
          <img src="404-1.png" alt="404-error" />
        </div>
        <div id="error-text">
          <p>
            Page Not Found!
          </p>
          <NavLink to="/">
            <button id='error-btn' className="btn">
              Go to Home
            </button>
          </NavLink>
        </div>
      </div>
  
    );
};

export default ErrorPage;