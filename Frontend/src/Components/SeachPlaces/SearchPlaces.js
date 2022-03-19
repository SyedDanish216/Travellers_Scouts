import React, { useState, useEffect } from "react";
import SearchBar1 from "./SearchBar/SearchBar1";
import SearchBar2 from "./SearchBar/SearchBar2";
import SearchBar3 from "./SearchBar/SearchBar3";
import { SearchCards } from "./SearchCards/SearchCards";
import "./SearchPlaces.css";
import { Navbar } from "../LandingPage/Navbar/Navbar";
import { Footer } from "../LandingPage/Footer/Footer";
import axios from "axios";

export const SearchPlaces = () => {
  const [locationInput, setLocationInput] = useState();
  const [placeInput, setPlaceInput] = useState();
  const [userInput, setUserInput] = useState();
  const [placedata, setplaceData] = useState([]);
  const [postdata, setPostData] = useState([]);
  useEffect(() => {
    const getPlaces = async () => {
      await axios
        .get("/dest/filterdata/", {
          params: {
            location: locationInput,
            place: placeInput,
            user: userInput,
          },
        })
        .then((res) => {
          console.log(res.data);
          setplaceData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPlaces();
    const getData = async () => {
      await axios
        .get("/dest/destination/getplaces")
        .then((res) => {
          setPostData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, [locationInput,placeInput,userInput]);

  const PostData = async (e) => {
    const getPlaces = async () => {
      await axios
        .get(
          `/dest/filterdata${
            locationInput ? "?location=" + locationInput : ""
          }${placeInput ? "&place=" + placeInput : ""}${
            userInput ? "&user=" + userInput : ""
          }`
        )
        .then((res) => {
          setplaceData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPlaces();
  };

  return (
    <>
      <Navbar />

      <div
        className="searchplacesouter"
        style={{ marginTop: "62px", marginBottom: "250px" }}
      >
        <div className="searchplaces">
          <div style={{ position: "relative", height: "300px" }}>
            <div className="img-background">
              <img
                src="https://images.pexels.com/photos/459271/pexels-photo-459271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
            </div>
            <div className="image-text">
              <div className="upperheading">Find a Place that fits you </div>
              <div className="belowheading">With Traveller's Scouts</div>
            </div>
          </div>

          <div className="search-boxes">
            <div
              className="row d-md-none d-sm-flex"
              data-toggle="collapse"
              data-target="#multiCollapseExample2"
              aria-expanded="false"
              aria-controls="multiCollapseExample2"
            >
              <i className="fas fa-filter">
                <br />
                <span>Filtration</span>
              </i>
            </div>

            <div className="row mt-5 d-md-flex d-sm-none hideonxsm">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-4 col-sm-12 mt-md-0 mt-sm-5   centr">
                    <div className="juscol">
                      <SearchBar1
                        name="location"
                        placeholder="Search by location"
                        data={postdata}
                        setValue={(val) => setLocationInput(val)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12 mt-md-0 mt-sm-5   centr">
                    <div className="juscol">
                      <SearchBar2
                        name="place"
                        placeholder="Search by place name"
                        data={postdata}
                        setValue={(val) => setPlaceInput(val)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12 mt-md-0 mt-sm-5   centr">
                    <div className="juscol">
                      <SearchBar3
                        name="user"
                        placeholder="Search by user name"
                        data={postdata}
                        setValue={(val) => setUserInput(val)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-12 mt-lg-0 mt-sm-4 ">
                <div className="row">
                  <div className="col-12 centr">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={PostData}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* This is for div which we have to show on clciking button */}
            <div
              className="row mt-4 collapse multi-collapse mtonxsm"
              id="multiCollapseExample2"
            >
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-4 col-sm-12 mt-md-0 mt-sm-5 centr">
                    <div className="juscol">
                      <SearchBar1
                        name="location"
                        placeholder="Search by location"
                        data={postdata}
                        setValue={(val) => setLocationInput(val)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-12 mt-md-0 mt-sm-5 centr ">
                    <div className="juscol">
                      <SearchBar2
                        name="place"
                        placeholder="Search by place"
                        data={postdata}
                        setValue={(val) => setPlaceInput(val)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-12 mt-md-0 mt-sm-5 centr">
                    <div className="juscol">
                      <SearchBar3
                        name="user"
                        placeholder="Search by user name"
                        data={postdata}
                        setValue={(val) => setUserInput(val)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-12 mt-lg-0 mt-sm-4 ">
                <div className="row">
                  <div className="col-12 centr">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={PostData}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5" style={{ marginTop: "80px" }}>
          {placedata.map((elem, index) => {
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
      </div>

      <div style={{ position: "relative", marginTop: "20px" }}>
        <Footer />
      </div>
    </>
  );
};
