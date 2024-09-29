import { Link } from "react-router-dom";
import "./navBar.scss";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="left">
        <Link to="/">
          <h1>METAN</h1>
        </Link>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default NavBar;
