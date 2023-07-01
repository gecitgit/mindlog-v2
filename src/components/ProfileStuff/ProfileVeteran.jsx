function ProfileVeteran({ postCount, user, sleepAvg, hasNotes }) {
    return (
        <div className="profileBodyText">
            <p>
                Great to have you back on your profile page.  I wanted to take a moment to celebrate your progress and give you a huge shoutout for logging your journey!
                <br /><br />
                Can you believe it? You've already logged your day <strong>{postCount}</strong> times. That's seriously impressive! Oh, and kudos for adding a note to <strong>{hasNotes}</strong> of them.  Those little details really bring your journal to life! You've also been getting an average of <strong>{sleepAvg.toFixed(2)}</strong> hours of sleep per night.  Let's see how that changes over time!
                <br /><br />
                I gotta say, your dedication to self-reflection and personal growth is truly inspiring.  You're on fire! By keeping up this consistency, you'll uncover amazing insights and spot the trends that shape your life.  So keep on logging and watch your journey unfold.
                <br /><br />
                Make sure to swing by here often. Not only will you see how your habits and mood change over time, but I also have some <strong>exciting</strong> new features planned to take your experience to the next level. Trust me, it's going to be a game-changer!
                <br /><br />
                I'm proud of the steps you've taken so far, <span style={{color: "#e85a4f", fontWeight: "bold"}}>{user}</span>. Keep it up!
            </p>
        </div>
    )
}

export default ProfileVeteran;