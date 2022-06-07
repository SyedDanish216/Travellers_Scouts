import { useState,useContext } from "react";
import './Rating.css';
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { useHistory } from "react-router-dom";

// import SocialDomain from "material-ui/svg-icons/social/domain";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"  
};
const Ratings=({dest_id, destauthor})=> {
  const history = useHistory()
  const {user}=useContext(AuthContext);
  const [hidefeedback,setHideFeedback]=useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)
  const [comment, setComment] = useState("");

  const handleCommentChange = event => {
    setComment(event.target.value)
  }

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
const submitRating = () => {
  // const getMyProfilePosts = async () => {
  //   if(currentValue===0)
  //   {
  //     alert("First review the user")
  //   }
  //   else{
  //   await axios
  //     .put(`/auth/users/updateuser${author ? "?id=" + author : ""}${
  //       currentValue ? "&rate=" + currentValue : ""
  //     }`)
  //     .then((res) => {
  //      console.log("Ratings Updated")
  //      alert("Review Submitted")
  //      setHideFeedback(true)
       
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // };
  // getMyProfilePosts();
  axios.post("http://localhost:8000/api/dest/createcomment", {
    id: dest_id,
    author: user._id, //comment-writer
    commentBody: comment,
    rating: currentValue
  }).then((res)=>{
      console.log(res)
      setTimeout(function(){
        alert("Comments and ratings added successfully"); 
     }, 1000);
     history.push("/Review");
  }).catch((err)=>{
    alert(err)
  })
}

  return (
    <>
    {(user._id!==destauthor && !hidefeedback)?
    (
    <div style={styles.container}>
      <div>
      <span style={{ fontSize:"35px",fontWeight:"500"}}>Add a comment</span> 
      </div>
      <div style={styles.stars} className="stars">
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={28}
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
        placeholder="write a comment"
        style={styles.textarea}
        id="message"
        name="message"
        // value={comment}
        onChange={handleCommentChange}       
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
 