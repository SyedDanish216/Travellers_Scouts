import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../LandingPage/Navbar/Navbar";
import { SearchCards } from "../SeachPlaces/SearchCards/SearchCards";
import "./Userprofile.css";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import { Footer } from "../LandingPage/Footer/Footer";

export const Userprofile = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getMyProfilePosts = async () => {
      await axios
        .get(`/dest/destination/getposts${user._id ? "?id=" + user._id : ""}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getMyProfilePosts();
  }, [user]);
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "120px", marginBottom: "140px" }}>
        <section id="about-section">
          <div className="about-left">
            <img src={user.profilePic} width="350px" height="300px" alt="" />
            {/* <img src="./Img/about.png" width="350px" /> */}
          </div>

          <div className="about-right">
            <span style={{ fontWeight: "bold", fontSize: "40px" }}>
              {user.username}
            </span>
            <h1>About Me</h1>
            <p>
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              fugiat a dolorem at similique maxime dolorum dolore enim dicta
              voluptatibus, illum recusandae, vel optio tempore ipsum incidunt
              eum. Aspernatur, repellendus. */}
              {user.userdescription}
            </p>
            <div className="address">
              <ul>
                <li>
                  <span className="address-logo">
                    <i className="fas fa-paper-plane"></i>
                  </span>
                  <p>Address</p>
                  <span className="saprater">:</span>
                  <p>
                    {user.city}, {user.state}, India
                  </p>
                </li>

                <li>
                  <span className="address-logo">
                    <i className="far fa-envelope"></i>
                  </span>
                  <p>Email ID</p>
                  <span className="saprater">:</span>
                  <p>{user.email}</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div style={{ marginTop: "50px" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold" }}>
              Experiences
            </span>
          </div>
          <div className="row mb-5" style={{ marginTop: "80px" }}>
            {data.map((elem, index) => {
              return (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 cardscentre"
                  key={index}
                >
                  <SearchCards data={elem} />
                </div>
              );
            })}
          </div>
          <div></div>
        </div>

        <div style={{ position: "relative ", marginTop: "200px" }}>
          <Footer />
        </div>
      </div>
    </>
  );
};
