import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogFilter from "../LogStuff/LogFilter";
import PostCard from "../LogStuff/PostCard";

function LogBody({ posts, onDeletePost }) {
    const [filterToggle, setFilterToggle] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts]);

    function handleFilterSubmit(formData) {
        const { days, dateRange, sleep, mood, energy } = formData;

        let postsArray = Object.entries(posts).map(([id, post]) => ({ ...post, id }));
        let filteredPosts = postsArray;

        if (days && days.length > 0) {
            filteredPosts = filteredPosts.filter((post) => days.includes(post.day));
        }

        if (dateRange) {
            const { start, end } = dateRange;
            filteredPosts = filteredPosts.filter(
                (post) => post.date >= start && post.date <= end
            );
        }

        if (sleep && sleep.length > 0) {
            filteredPosts = filteredPosts.filter((post) => {
                const postSleep = Math.floor(post.sleep);
                return sleep.some((sleepOption) => {
                    if (sleepOption === "10+") {
                        return postSleep >= 10;
                    } else {
                        const [start, end] = sleepOption.split(" - ");
                        const startHours = parseFloat(start);
                        const endHours = parseFloat(end);
                        return (
                            (startHours === 10 && postSleep >= startHours) ||
                            (postSleep >= startHours && postSleep <= endHours)
                        );
                    }
                });

            });
        }
        if (mood && mood.length > 0) {
            filteredPosts = filteredPosts.filter((post) => {
                const postMood = post.mood.slice(2).toLowerCase();
                const formDataMoods = mood.map((m) => m.toLowerCase());
                return formDataMoods.some((moodOption) => postMood.includes(moodOption))
            });
        }

        if (energy && energy.length > 0) {
            filteredPosts = filteredPosts.filter((post) => energy.includes(post.energy.toLowerCase()));
        }

        let filteredPostsObj = {};
        for (let post of filteredPosts) {
            filteredPostsObj[post.id] = post;
        }

        setFilteredPosts(filteredPostsObj)
    }


    return (
        <div className="pageBody">
            <h1 className="pageBodyText" style={{ marginBottom: 0 }}>Welcome to your Journal</h1>
            <p style={{ padding: "5px" }}>
                Welcome to the Log page! Here, you can view all your log entries and dive into the details of your journey.  Use the "Show Filters" button to refine your search by day of the week, date range, hours slept, mood, and energy.  Customize your view to uncover the moments that matter most.
                <br />
                Adding a new entry is a breeze from this page too! Simply click the designated button and let your thoughts flow onto the screen.
                <br />
                Keep an eye out for posts marked with a "*", as they have additional notes.  Click "Read More" to expand the post in a convenient overlay.
                <br />
                Explore, reflect, and make this page your personal sanctuary of memories. Your story awaits!
            </p>
            <p style={{ fontSize: "22px", margin: "0", paddingBottom: "10px" }}>Currently displaying <strong>{Object.keys(filteredPosts).length}</strong> posts!</p>
            <button onClick={() => setFilterToggle(!filterToggle)} className="toggleFilterBtn">
                {filterToggle ? "Hide Filters" : "View Filters"}
            </button>
            {filterToggle && (
                <LogFilter
                    posts={posts}
                    onFilterSubmit={handleFilterSubmit}
                />
            )}
            <Link to="/newForm" className="toggleFilterBtn">Create New Entry</Link>

            <div className="logContainer">
                {Object.keys(filteredPosts).length === 0 ? (
                    Object.keys(posts).length === 0 ? (
                        <p id="no-items-in-log">You haven't logged anything yet! Click on the 'Create New Entry' button above to access the form and start your journey!</p>
                    ) : (
                        <p id="no-items-in-log">Oops! Looks like there are no posts to show with the current filter. Try adjusting your filter settings for more results!</p>
                    )
                ) : (
                    Object.entries(filteredPosts)
                        .sort(([idA, postA], [idB, postB]) => {
                            return (
                                new Date(`${postA.date} ${postA.time}`) - new Date(`${postB.date} ${postB.time}`)
                            );
                        }).map(([id, post]) => {
                            return (
                                <PostCard
                                    key={id}
                                    post={post}
                                    postId={id}
                                    onDeletePost={onDeletePost}
                                />
                            );
                        })
                )}
            </div>
        </div>
    );
}

export default LogBody;