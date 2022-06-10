import React, { useContext } from "react";
import "./Navbar.css";
import image1 from "../images/img1.jpeg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../authContext/AuthContext";
import { Logout } from "../../../authContext/apiCalls";
export const Navbar = ({ home }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const { user } = useContext(AuthContext);
  const user1 = JSON.parse(localStorage.getItem("user"));
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="head">
      {home === "home" && (
        <div className="tansparentshading">
          <p>TRAVELLER'S SCOUT</p>
          <span>A globetrotter's guide,</span>

          <span> curated by globetrotters around the world</span>
        </div>
      )}
      <div>
        <nav
          className={
            home === "home"
              ? isScrolled
                ? "scrolled navbar navbar-expand-lg navbar-light"
                : "navbar navbar-expand-lg navbar-light"
              : "scrolled navbar navbar-expand-lg navbar-light"
          }
        >
          <div style={{ marginRight: "10px" }}>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ backgroundColor: "white" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {user || user1 ? (
                <li className="nav-item dropdown">
                  <NavLink className="nav-link" to="/Userprofile">
                    Your Profile
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/LogIn">
                    Log In
                  </NavLink>
                </li>
              )}

              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              {(user || user1) && (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Places
                  </NavLink>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink className="dropdown-item" to="/SearchPlaces">
                      Search Places
                    </NavLink>
                    <NavLink className="dropdown-item " to="/CreateExperience">
                      Create Experience
                    </NavLink>
                  </div>
                </li>
              )}

              <li className="nav-item">
                <NavLink to="/AboutUs" role="button" className="nav-link">
                  About Us
                </NavLink>
              </li>
              {(user || user1) && (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    onClick={() => Logout(dispatch)}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      {home === "home" && (
        <div className="cara">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={image1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
