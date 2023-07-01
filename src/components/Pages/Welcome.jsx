import { Link } from "react-router-dom";

function Welcome() {
    return (
        <div className="pageBody">
            <div className="pageBodyText">
                <h2 style={{ color: "red", fontSize: "28px" }}>Page = done</h2>
                <div>
                    <h1 className="h1Title">Welcome to <span style={{ color: "#e85a4f" }}>MindLOG</span>!</h1>
                    <p>
                        Welcome to MindLOG, your friendly mood companion.  Get ready to log your experiences, track your mood, nights of sleep, and unlock captivating insights about yourself.
                        <br />
                        Simply tap the form button below to start pouring your thoughts, worries and delightful musings.  I'm here to capture your journey and provide valuable self-reflection.
                        <br />
                        Head over to the Log page to relive your journal entries effortlessly. Scroll, filter, and cherish those heartwarming moments.
                        <br />
                        And wait, there's more! Explore the Stats page for a visual representation of your mood and emotions.  You'll be surprised at what you find.
                        <br />
                        Let's get started on this journaling adventure together. Happy logging!
                    </p>
                    <Link to="/newForm" className="joinForm">Start Logging</Link>
                </div>
            </div>
        </div>
    );
}

export default Welcome;