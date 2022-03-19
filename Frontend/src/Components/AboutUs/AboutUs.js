import React, { useState } from "react";
import { Navbar } from "../LandingPage/Navbar/Navbar";
import { Footer } from "../LandingPage/Footer/Footer";
import "./AboutUs.css";

export const AboutUs = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <Navbar />

      <div
        style={{
          marginTop: "270px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          minHeight: "400px",
          width: "100%",
          alignItems: "center",
        }}
        className="aboutus"
      >
        <div
          className="boxaboutus py-4"
          style={{
            width: "80%",
            minheight: "430px",

            display: "flex",
            borderRadius: "20px",
            backgroundColor: "#dcdde1",
          }}
        >
          <div
            style={{ width: "100%", height: "100%", display: "flex" }}
            className="row"
          >
            <div className="leftimage col-lg-6 col-sm-12 mx-auto">
              <img
                src="https://st2.depositphotos.com/3591429/5997/i/600/depositphotos_59977559-stock-photo-hands-holding-word-about-us.jpg"
                alt=""
              />
            </div>
            <div className="rightimage mx-auto px-4 my-4 col-lg-6 col-sm-12">
              <div
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="my-2"
              >
                <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                  About Us{" "}
                </span>
              </div>
              <div>
                <span style={{ fontSize: "20px" }}>
                  This website is made for the people around the world who likes
                  to travel and go to different places and different monuments
                  and famous places.{" "}
                </span>
              </div>
              {!clicked ? (
                <div>
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={() => setClicked(true)}
                  >
                    Read More
                  </button>
                </div>
              ) : (
                <div>
                  <br />
                  <span style={{ fontSize: "20px" }}>
                    People travelling can share their experience by posting
                    different images and can also describe their experience of
                    their entire journey from their home through their way upto
                    the amzing monument and place. Different people can rate a
                    user on the basis of their shared experience. The users whom
                    have shared the correct information will tend to have more
                    rating.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "relative ", marginTop: "480px" }}>
        <Footer />
      </div>
    </>
  );
};
