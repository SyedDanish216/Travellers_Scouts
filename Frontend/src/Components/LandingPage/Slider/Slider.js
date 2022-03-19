import "./Slider.css";
import React, { useEffect, useState} from "react";
import { Slideitemuser } from "../Slideitemuser/Slideitemuser";
import { Slideitem } from "../Slideitem/Slideitem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
export const Slider = () => {
  const [data, setData] = useState([]);
  const [placedata,setplaceData]=useState([]);
  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("/auth/getusers")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
    const getPlaces = async () => {
      await axios
        .get("/dest/destination/getplaces")
        .then((res) => {
          console.log(res.data);
          setplaceData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPlaces();
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1250 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1250, min: 970 },
      items: 3,
    },
    tablet2: {
      breakpoint: { max: 970, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div style={{ marginTop: "40px", marginBottom: "10px" }}>
        <div className="mostratedusers">
          <span style={{ fontSize: "40px" }}>Most Rated Users</span>
        </div>
        <Carousel responsive={responsive} itemClass="styleclass">
          {data.map((val, index) => {
            return (
              <div>
                <Slideitemuser data={val} index={index} />
              </div>
            );
          })}
     
        </Carousel>
      </div>
      <div style={{ marginTop: "40px", marginBottom: "200px",marginLeft:"20px" }}>
        <div className="mostratedusers">
          <span style={{ fontSize: "40px" }}>Most Famous Places</span>
        </div>
        <Carousel responsive={responsive} itemClass="styleclass">
        {placedata.map((val, index) => {
            return (
          <div>
            <Slideitem data={val} index={index} />
          </div>
          );
          })}
         
        </Carousel>
      </div>
    </>
  );
};
