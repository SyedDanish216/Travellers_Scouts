import React from "react";
import "./ImageGallery.css";

import SimpleReactLightbox from "simple-react-lightbox";

import { SRLWrapper } from "simple-react-lightbox";

function ImgCard({data}) {
  return(
  <div
  className="row img-gallery"
  style={{
    justifyContent: "center",
    alignItems: "center",
    width:"90%",
    alignSelf:"center",
    display:"flex",
    marginLeft:"5%"
   
  }}
>


    { data.map((image, index) => {
    return (
      
        <div
          className="col-md-6 col-lg-4 col-12"
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
          }}
          key={index}
        >
          <div className="imgcard" style={{borderRadius:"22px"}}>
            <div style={{ height: "250px", width: "100%",cursor:"pointer" }}>
              <img src={image}  alt="" style={{borderRadius:"22px"}} />
            </div>
          </div>
        </div>
      
    );
   })
   }
  </div>
  )
}

function MyComponent({data}) {  
  return (
    <SRLWrapper>
      <ImgCard data={data} />
    </SRLWrapper>
  );

}

export const ImageGallery = ({data}) => {
  return (
    // Wrap your app with the component
    <SimpleReactLightbox>
      <MyComponent data={data} />
    </SimpleReactLightbox>
  );
};
