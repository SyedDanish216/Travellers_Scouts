import Card from "../CreateExperience/Card/Card";
import './Comment.css'

const Comment = ({comment}) => {
    return (
        <Card>
            {/* <div> */}
                <h6 className="comment-author">{comment.author.username}</h6>
                <p className="comment-body">{comment.comment}</p>
                <p className="comment-rating">Rating: {comment.rating}</p>
            {/* </div> */}
        </Card>
    );
}

export default Comment