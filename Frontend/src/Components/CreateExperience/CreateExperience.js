import { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import classes from "./CreateExperience.module.css";
import Card from "./Card/Card";
import { Navbar } from "../LandingPage/Navbar/Navbar";
import { Footer } from "../LandingPage/Footer/Footer";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";


const CreateExperience = () => {
  const history = useHistory();
  const [requiredfield, setRequiredfield] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState();
  const [photo, setPhoto] = useState();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    title: "",
    city: "",
    state: "",
    description: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const uploadImage = (e) => {
    e.preventDefault();
    setFiles(e.target.files);
  };

  const uploadPhoto = (e) => {
    e.preventDefault();
    setPhoto(e.target.files[0]);
  };

  const PostData = async (e) => {
    e.preventDefault();
    if (!data.title || !data.city || !data.state || !data.description || !files || !photo) {
      setRequiredfield(true);
    }
    else{
    const fd = new FormData();
    fd.append("title", data.title);
    fd.append("city", data.city);
    fd.append("state", data.state);
    fd.append("description", data.description);
    fd.append("author", user._id);
    fd.append("username", user.username);
    fd.append(`image`, photo);
    fd.append("userid", user._id)

    for (let i = 0; i < files.length; i++) {
      fd.append(`image`, files[i]);
    }

    
    
      setLoading(true);
      await axios
        .post("/dest/destination", fd)
        .then((_res) => {
          setLoading(false);
          setTimeout(function(){
            alert("Post created successfull"); 
         }, 1000);
         history.push("/Userprofile");
          
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert("Post creation unsuccessfull. Only .jpeg and .png images are allowed");
          
        });
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ marginTop: "200px" }}>
        <Card className={classes.background}>
          <div className="row my-3">
            <h1 className={"text-center mb-4 " + classes.heading}>
              Add a new travel experience
            </h1>
            <div className="col-md-9 mx-auto">
              <form>
                <div className="mb-3">
                  <label
                    className={"form-label " + classes.labelStyle}
                    for="title"
                  >
                    Name of Destination *
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleInputs}
                    value={data.title}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    className={"form-label " + classes.labelStyle}
                    for="State"
                  >
                    State *
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="state"
                    name="state"
                    onChange={handleInputs}
                    value={data.state}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    className={"form-label " + classes.labelStyle}
                    for="city"
                  >
                    City *
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="city"
                    name="city"
                    onChange={handleInputs}
                    value={data.city}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    className={"form-label " + classes.labelStyle}
                    for="description"
                  >
                    Write your experience *
                  </label>
                  <textarea
                    className="form-control"
                    type="text"
                    id="description"
                    name="description"
                    onChange={handleInputs}
                    value={data.description}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    for="choose-files"
                    className={"form-label " + classes.labelStyle}
                  >
                    Add a Thumbnail Image *
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    alt="Thumbnail Images"
                    name="photo"
                    accept="image/jpeg, image/png"
                    onChange={uploadPhoto}
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="choose-files"
                    className={"form-label " + classes.labelStyle}
                  >
                    Add Images(No more than 6 images) *
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    alt="Picture of a destination"
                    name="image"
                    accept="image/jpeg, image/png"
                    onChange={uploadImage}
                    multiple
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-success" onClick={PostData}>
                    Share your experience
                  </button>
                  <br />
                    {requiredfield ? (
                      <span className="small text-danger">
                        fields marked * are required
                      </span>
                    ) : (
                      <> </>
                    )}
                    
                    {loading?(<div style={{justifyContent:"center",display:"flex",
        textAlign:"center",flexDirection:"column"}}>
          <div>
          <span style={{fontSize:"30px"}}>Loading...</span>
          </div>
          <div>
          <ReactBootStrap.Spinner animation="grow" size="lg" />
          </div>
          </div>):<></>}
                </div>
              </form>
              <NavLink to="/">Back to Landing</NavLink>
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

export default CreateExperience;
