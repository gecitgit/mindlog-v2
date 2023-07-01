import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileRookie from "../ProfileStuff/ProfileRookie";
import ProfileVeteran from "../ProfileStuff/ProfileVeteran";

function ProfileBody({ currentUser }) {
    const [postCount, setPostCount] = useState(0);
    const [sleepAvg, setSleepAvg] = useState(0);
    const [hasNotes, setHasNotes] = useState(0);

    useEffect(() => {
        if (currentUser.posts) {
            const postCount = Object.keys(currentUser.posts).length;
            const sleepArr = [];
            let notesCount = 0;

            Object.values(currentUser.posts).forEach((post) => {
                sleepArr.push(parseFloat(post.sleep));
                if (post.notes && post.notes.length > 2) {
                    notesCount++;
                }
            });

            const sleepAvg = sleepArr.reduce((a, b) => a + b, 0) / sleepArr.length;

            setPostCount(postCount);
            setSleepAvg(sleepAvg);
            setHasNotes(notesCount);
        }
    }, [currentUser]);

    if (postCount === 0) {
        return (
            <div className="pageBody">
                <h1 style={{marginBottom: 0}}>Welcome, {currentUser.username}!</h1>
                <p style={{padding: "5px", fontSize: "18px", textAlign: "center"}}>
                    Welcome to your profile! I'm thrilled to have you here.  Currently, your profile is ready and waiting for you to get into action.  Since you don't have any posts yet there's nothing for me to display but I'm excited to change that! Press that button down there to get your first post submitted and then come on back!  You'll see your profile flourish over time as you dive into your own emotions!
                </p>
                <Link to="/newForm" className="toggleFilterBtn">Create New Entry</Link>

            </div>
        )
    }

    return (
        <div className="pageBody">
            <h1 style={{marginBottom: 0}}>Hey there, <span style={{color: "#e85a4f" }}>{currentUser.username}</span></h1>
            {postCount > 10 ? (
                <ProfileVeteran postCount={postCount} sleepAvg={sleepAvg} hasNotes={hasNotes} user={currentUser.username} />
            ) : (
                <ProfileRookie postCount={postCount} sleepAvg={sleepAvg} hasNotes={hasNotes} user={currentUser.username} />
            )}
        </div>
    )
}

export default ProfileBody;
