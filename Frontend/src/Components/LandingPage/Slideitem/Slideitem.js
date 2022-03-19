import React from "react";
import "./Slideitem.css";
import {NavLink} from "react-router-dom";

export const Slideitem = ({data}) => {
  return (
    <div className="outerbox">
      <div>
        <img
          src={data.userthumbnail}
          alt="..."
        />
      </div>
      <div className="box">
        <div style={{ paddingLeft: "5px" }}>
          <p>{data.title}</p>
        </div>
        <div
          style={{
            alignItems: "flex-end",
            textAlign: "end",
            paddingRight: "5px",
          }}
        >
          <i className="fas fa-compass" />
          <span style={{ marginLeft: "4px" }}>{data.city}</span>
        </div>
      </div>
      <div className="viewdetails">
         <span><NavLink to="/SearchPlaces"
          className="textnone">View Details<i className="fas fa-chevron-right"></i>
          </NavLink>
         </span>
      </div>
    </div>
  );
};
