import React, { useState } from "react";
import classes from "./SignupPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpImage from "./Images/SignupImage.png";
import { NavLink } from "react-router-dom";
import Card from "../CreateExperience/Card/Card";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../LandingPage/Navbar/Navbar";
import { Footer } from "../LandingPage/Footer/Footer";
import validator from "validator";
import * as ReactBootStrap from "react-bootstrap";

export const SignupPage = () => {
  const history = useHistory();
  const [requiredfield, setRequiredfield] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    photo: "",
    state: "",
    city: "",
    description: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const uploadImage = (e) => {
    e.preventDefault();
    setUser({ ...user, photo: e.target.files[0] });
    console.log(e.target.files[0]);
  };
  const validate = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Password is strong");
    } else {
      setErrorMessage("Password is not strong");
    }
  };
  const PostData = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", user.name);
    fd.append("username", user.username);
    fd.append("email", user.email);
    fd.append("photo", user.photo);
    fd.append("password", user.password);
    fd.append("state", user.state);
    fd.append("description", user.description);
    fd.append("city", user.city);

    const {
      name,
      username,
      email,
      password,
      confirmpassword,
      photo,
      state,
      city,
      description,
    } = user;
    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !confirmpassword ||
      !photo ||
      !state ||
      !city ||
      !description
    ) {
      // alert("First fill the required fields");
      setRequiredfield(true);
    } else if (errorMessage === "Is Not Strong Password") {
      alert(
        "Password should  be of minimum 8 length and should contain atleast 1 uppercase, lowercase and special symbol"
      );
    } else if (confirmpassword !== password) {
      alert("password mismatch");
    } else {
      setLoading(true);
      await axios
        .post("/auth/register", fd)
        .then((res) => {
          console.log(res);
          setLoading(false);
          history.push("/LogIn");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert("Invalid email id");
        });
    }
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          marginTop: "150px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
      </div>
      <div style={{ marginTop: "50px" }}>
        <Card>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 col-sm-12 d-none d-md-flex align-items-center justify-content-center">
              <img
                src={SignUpImage}
                alt="login form"
                className={"img-fluid " + classes.imgStyle}
              />
            </div>

            <div className="col-md-6 col-lg-7 col-sm-12 d-flex align-items-center">
              <div className="card-body p-3 p-lg-4 text-black">
                <form>
                  <div className="d-flex align-items-center mb-2 pb-1">
                    <span className={"h1 fw-bold mb-0 " + classes.brandName}>
                      Welcome to Traveller's Scout
                    </span>
                  </div>

                  <h5 className={"fw-normal mb-2 pb-3 " + classes.signinText}>
                    Create a new account
                  </h5>

                  <div className="form-outline mb-2">
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      className="form-control form-control-md"
                      placeholder="enter your name*"
                      onChange={handleInputs}
                    />
                  </div>

                  <div className="form-outline mb-2">
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      className="form-control form-control-md"
                      placeholder="enter username*"
                      onChange={handleInputs}
                      required
                    />
                  </div>

                  <div className="form-outline mb-2">
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      className="form-control form-control-md"
                      placeholder="email*"
                      onChange={handleInputs}
                      required
                    />
                  </div>
                  <div className="form-outline mb-2">
                    <input
                      type="text"
                      name="state"
                      value={user.state}
                      className="form-control form-control-md"
                      placeholder="state *"
                      onChange={handleInputs}
                      required
                    />
                  </div>
                  <div className="form-outline mb-2">
                    <input
                      type="text"
                      name="city"
                      value={user.city}
                      className="form-control form-control-md"
                      placeholder="city *"
                      onChange={handleInputs}
                      required
                    />
                  </div>
                  <div className="form-outline mb-2">
                    <textarea
                      type="text"
                      name="description"
                      value={user.description}
                      className="form-control form-control-md"
                      placeholder="Brief description about you *"
                      onChange={handleInputs}
                      required
                    ></textarea>
                  </div>

                  <div className="form-outline mb-2">
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      className="form-control form-control-md"
                      placeholder="password*"
                      onChange={validate}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="confirmpassword"
                      value={user.confirmpassword}
                      className="form-control form-control-md"
                      placeholder="verify password*"
                      onChange={handleInputs}
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor="choose-files"
                      className={"form-label mb-0 " + classes.labelStyle}
                    >
                      Add a profile picture
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      alt="Picture of a destination"
                      name="photo"
                      onChange={uploadImage}
                      accept="image/*"
                      placeholder="Add a profile picture*"
                    />
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-dark btn-md"
                      type="button"
                      onClick={PostData}
                    >
                      Sign Up
                    </button>
                    <br />
                    {requiredfield ? (
                      <span className="small text-danger">
                        fields marked * are required
                      </span>
                    ) : (
                      <> </>
                    )}
                    <br />
                    <span className="small text-danger">{errorMessage}</span>
                  </div>
                </form>
                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
                <p className="mb-3 pb-lg-2" style={{ color: "#393f81" }}>
                  Already have an account?{" "}
                  <NavLink to="/Login" style={{ color: "#393f81" }}>
                    Log In
                  </NavLink>
                </p>
                <a href="#!" className="small text-muted">
                  Terms of use
                </a>
                &nbsp;&nbsp;
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
                {loading ? (
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      textAlign: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "30px" }}>Loading...</span>
                    </div>
                    <div>
                      <ReactBootStrap.Spinner animation="grow" size="lg" />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ position: "relative ", marginTop: "360px" }}>
        <Footer />
      </div>
    </>
  );
};

export default SignupPage;
