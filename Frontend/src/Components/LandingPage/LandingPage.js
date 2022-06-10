import React,{useEffect,useContext} from "react";
import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";
import {Slider} from "./Slider/Slider";
import { AuthContext } from "../../authContext/AuthContext";
import "./LandingPage.css";
import { useHistory } from "react-router-dom";
export const LandingPage = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  // useEffect(() => {
  //   if (!user) {
  //     history.push("/Login");
  //     console.log(user);
  //   }
 
  // }, [user,history]);
  return (
    <>
      <Navbar home="home" />

      <div>
        {/* <Slider text="Popular Places" />
        <Slider text="Top Travellers" /> */}
        <Slider />
      </div>


      <div style={{ position: "relative", marginTop: "150px" }}>
        <Footer />
      </div>
    </>
  );
};
