import { toast } from "react-toastify";
import ReactConfirmPopup from "react-confirm-popup";
import { TbTrash, TbBook } from "react-icons/tb";

function PostCard({ post, postId, onDeletePost }) {
    const postDate = new Date(`${post.date} ${post.time}`)
    
    return (
        <div className="logBoxSmall">
            <span className="postCardTextLarge">
                {postDate.toLocaleDateString(undefined, { weekday: 'long' })}
                {post.notes.length > 1 &&
                    <span style={{ color: "#e85a4f", fontWeight: "bolder" }}>
                        *
                    </span>
                }
            </span>
            <span className="postCardTextMedium">
                {postDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="postCardTextSmall">
                Time logged: {postDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
            </span>
            <span className="postCardTextSmall">
                Sleep: {post.sleep} hours
            </span>
            <span className="postCardTextSmall">
                Mood: {post.mood}
            </span>
            <span className="postCardTextSmall">
                Energy: {post.energy}
            </span>

            <div className="postBtns">
                <ReactConfirmPopup 
                    trigger={<button className="deleteLog">Delete <TbTrash /></button>}
                    title="Do you really want to delete this post?"
                    text={<p>This cannot be undone.</p>}
                    confirmText="Delete"
                    cancelText="nevermind..."
                    onConfirmClicked={() => onDeletePost(postId)}
                />
                <button
                    className="logInfo"
                    onClick={() => toast.info("this will show the more info modal")}
                >
                    Read More <TbBook />
                </button>
            </div>
            {/* this will be postInfo/modal logic later */}
            {/* <PostBlownUpInfo postInfo={selectedPost}>
                
            </PostBlownUpInfo> */}
        </div>
    )
}

export default PostCard;