import { useState,useContext } from "react";
import './Rating.css';
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";

// import SocialDomain from "material-ui/svg-icons/social/domain";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"  
};
const Ratings=({author})=> {
  const {user}=useContext(AuthContext);
  const [hidefeedback,setHideFeedback]=useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
    console.log(value);
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }
const submitRating=()=>{
  const getMyProfilePosts = async () => {
    if(currentValue===0)
    {
      alert("First review the user")
    }
    else{
    await axios
      .put(`/auth/users/updateuser${author ? "?id=" + author : ""}${
        currentValue ? "&rate=" + currentValue : ""
      }`)
      .then((res) => {
       console.log("Ratings Updated")
       alert("Review Submitted")
       setHideFeedback(true)
       
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  getMyProfilePosts();
}

  return (
    <>
    {(user._id!==author && !hidefeedback)?
    (
    <div style={styles.container}>
      <div>
      <span style={{ fontSize:"35px",fontWeight:"500"}}> Review this User</span> 
      </div>
      <div style={styles.stars} className="stars">
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={32}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <textarea
        placeholder="Write feedback to the user"
        style={styles.textarea}       
      />
      <button
        style={styles.button}
        onClick={submitRating}
        className="btn"
      >
        Submit
      </button>
      
    </div>
    ):<></>}

    </>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
    margin:"8px 0px"
  },
  textarea: {
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 600
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
    color:"white",
    backgroundColor:"#34495e"
  },
 

};




export default Ratings;
 