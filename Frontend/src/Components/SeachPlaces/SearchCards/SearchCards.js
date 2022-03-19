import React from "react";
import "./SearchCards.css";
import { NavLink } from "react-router-dom";
export const SearchCards = ({ data }) => {
  return (
   
      <div className="outerbox1">
      <div>
        <img
          // src="https://images.pexels.com/photos/5848766/pexels-photo-5848766.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          src={data.userthumbnail}
          alt="..."
        />
      </div>
      <div className="box1">
        <div style={{ paddingLeft: "5px", paddingTop: "5px" }}>
          <p>{data.title}</p>
        </div>
        <div
          style={{
            alignItems: "flex-end",
            textAlign: "end",
            paddingRight: "5px",
            paddingTop: "5px",
          }}
        >
          <i className="fas fa-compass" />
          <span style={{ marginLeft: "4px" }}>{data.city},{data.state}</span>
        </div>
      </div>
      <div className="box1">
        <div style={{ paddingLeft: "5px", paddingTop: "5px" }}>
          <span>
            by user:
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              {" "}
              {data.username}
            </span>
          </span>
        </div>
      </div>
      <div className="viewdetails">
        <button style={{backgroundColor:"transparent",border:"none",backgroundRepeat:"no-repeat"}} onClick={()=>localStorage.setItem("userexperience",JSON.stringify(data))}>
          <NavLink to={{pathname:"/Review",data:data}} className="textnone">
            View Details<i className="fas fa-chevron-right"></i>
          </NavLink>
        </button>
      </div>
    </div>
     

  );
  
};
