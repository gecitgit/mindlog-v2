import ReactConfirmPopup from "react-confirm-popup";
import { TbTrash, TbBook } from "react-icons/tb";
import { useEffect, useState } from "react";

function PostCard({ post, postId, onDeletePost }) {
    const postDate = new Date(`${post.date} ${post.time}`)
    const [modal, setModal] = useState(false);

    function toggleModal() {
        setModal(!modal);
    }

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setModal(false);
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    if(modal) {
        document.body.classList.add("modal-open");
    } else {
        document.body.classList.remove("modal-open");
    }

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
                    onClick={toggleModal}
                >
                    Read More <TbBook />
                </button>
            </div>
            {modal && (
                <div className="modal-body">
                    <div onClick={toggleModal} className="modal-overlay">
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <span className="postCardTextMedium">
                                <strong>{postDate.toLocaleDateString(undefined, { weekday: 'long' })}</strong>, <strong>{postDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                            </span>
                            <p>
                                Let's take a look at your <strong>{postDate.toLocaleDateString(undefined, { weekday: 'long'})}</strong>. <br /> You logged your post at <strong>{postDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</strong> after recording a whole <strong>{post.sleep}</strong> hours of sleep! You reported feeling <strong>{post.energy}</strong> today and your overall mood for the day was <strong>{post.mood}</strong>.
                                <br /> <br />
                                {post.notes.length > 1 ? (
                                    <span>Here's what you had to say: <br /> <span><em>{post.notes}</em></span> </span>
                                ) : (
                                    <span>You didn't have any additional notes for the day.</span>
                                )}
                            </p>
                            <button className="modal-close-btn" onClick={toggleModal}>Back to the log</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostCard;