import { useEffect, useState } from "react";
import UserHome from "./UserHome";
import ChooseUsername from "./ChooseUsername";
import { toast } from "react-toastify";
import { getDatabase, ref, onValue, update, push, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

function HomeLayout({ userID, userSignOut, auth}) {
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, `users/${userID}`);

        const unsubscribeUser = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setCurrentUser(data);
        });
        return () => unsubscribeUser();
    }, [userID]);

    useEffect(() => {
        const db = getDatabase();
        const postsRef = ref(db, `users/${userID}/posts`);

        const unsubscribePosts = onValue(postsRef, (snapshot) => {
            const postsData = snapshot.val();
            const updatedUser = {
                ...currentUser,
                posts: postsData,
            };
            setCurrentUser(updatedUser);
        });
        return () => unsubscribePosts();
    }, [userID]);

    function handleUsernameSubmit(username) {
        console.log("Home layout -- submit was pressed wit hthis username: ", username);
        const updatedUser = {
            ...currentUser,
            username: username,
        };

        const db = getDatabase();
        const userRef = ref(db, `users/${userID}`);

        update(userRef, updatedUser)
            .then(() => {
                toast.success("username successfully added")
                setCurrentUser(updatedUser);
            })
            .catch((error) => {
                console.log("Error updating username: ", error);
                toast.error("There was an issue saving the username. Try again later")
            })
    }

    function handlePostSubmit(postData) {
        const db = getDatabase();
        const postsRef = ref(db, `users/${userID}/posts`);

        const newPostKey = push(postsRef).key;

        const newPost = {
            [newPostKey]: postData,
        };

        update(postsRef, newPost)
            .then(() => {
                toast.success("post successfully added")
                navigate("/log");
            })
            .catch((error) => {
                toast.error("error adding post")
                console.log('error' + error)
            })
    }

    function handleDeletePost(postId) {
        console.log("this i the postId being passed down when this gets deleted: ", postId)
        const db = getDatabase();
        const postRef = ref(db, `users/${userID}/posts/${postId}`);
        remove(postRef)
            .then(() => {
                toast.success("post successfully deleted")
            })
            .catch((error) => {
                toast.error("error deleting post")
                console.log('error' + error)
            });
    }

    return (
        <div>
            { currentUser && currentUser.username ? (
                <UserHome currentUser={currentUser} userSignOut={userSignOut} onPostSubmit={handlePostSubmit} onDeletePost={handleDeletePost}/>
            ) : (
                <ChooseUsername onUsernameSubmit={handleUsernameSubmit} currentUser={currentUser}/>
            )}
        </div>
    )
}

export default HomeLayout;