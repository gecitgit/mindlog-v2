function ProfileRookie({ postCount, sleepAvg, hasNotes, user }) {
    return (
        <div className="profileBodyText">
            <p>
                Welcome to your profile page. I wanted to take a moment to acknowledge your commitment and thank you for starting your journey with me!
                <br /><br />
                You're off to a great start with <strong>{postCount}</strong> posts already.  Every step counts, and you're on the right track! You've even written a note on <strong>{hasNotes}</strong> of those posts so far! Did you know that you're currently averaging <strong>{sleepAvg.toFixed(2)}</strong> hours of sleep per night? Let's see how that changes over time!
                <br /><br />
                Make sure to swing by here often. Not only will you see how your habits and mood change over time, but I also have some <strong>exciting</strong> new features planned to take your experience to the next level. Trust me, it's going to be a game-changer!
                <br /><br />
                I'm proud of the steps you've taken so far, <span style={{ color: "#e85a4f", fontWeight: "bold" }}>{user}</span>. Keep it up!
            </p>
        </div>
    )
}
export default ProfileRookie;