import React from "react";
import "./Slideitemuser.css";
import { NavLink} from "react-router-dom";
export const Slideitemuser = ({data}) => {

  return (
    <>
      
          <div className="outerbox">
            <div>
              <img
                src={data.profilePic}
                alt="..."
              />
            </div>
            <div className="box">
              <div style={{ paddingLeft: "5px" }}>
                <p>{data.username}</p>
              </div>
              <div
                style={{
                  alignItems: "flex-end",
                  textAlign: "end",
                  paddingRight: "5px",
                }}
              >
                <span>
                  Ratings: {data.ratings}
                  <i className="far fa-star" style={{ color: "orange" }}></i>
                </span>
              </div>
            </div>
            <div className="viewdet">
            
              <button style={{backgroundColor:"transparent",border:"none",backgroundRepeat:"no-repeat"}} onClick={()=>localStorage.setItem("userprofile",JSON.stringify(data))}>

                <NavLink to={{pathname:"/Otheruserprofile",data:data}} className="textnone">
                  View Experience<i className="fas fa-chevron-right"></i>
                </NavLink>
              </button>
            </div>
          </div>
    
    </>
  );
};
