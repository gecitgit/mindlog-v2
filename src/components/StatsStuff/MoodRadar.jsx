import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from "recharts";

function MoodRadar({ currentUser }) {

    const moodSleepAverages = {};

    for (const post of currentUser.posts) {
        const { mood, sleep } = post;
        if (!moodSleepAverages[mood]) {
            moodSleepAverages[mood] = [];
        }
        moodSleepAverages[mood].push(parseFloat(sleep));
    }

    const result = Object.entries(moodSleepAverages).map(([mood, sleepValues]) => {
        const averageSleep = (sleepValues.reduce((sum, value) => sum + value, 0) / sleepValues.length).toFixed(2);
        return {
            mood,
            sleep: parseFloat(averageSleep),
        };
    });

    function MoodRadarToolTip({ active, payload, label }) {
        if (active) {
            return <div className="tool-tip">
                <h4 id="tool-tip-label">{label}</h4>
                <p>
                    {payload[0].value} hours
                </p>
            </div>
        }
        return null;
    }

    let maxSleepHours = 0;
    let maxSleepMood = "";

    result.forEach(entry => {
        if (entry.sleep > maxSleepHours) {
            maxSleepHours = entry.sleep;
            maxSleepMood = entry.mood
        }
    })

    return (
        <div className="stat-box">
            <h2>Average Sleep Distribution vs Mood</h2>
            <p>
                This radar graph shows the average distribution of your energy each day compared to how much sleep you get. Most days you report feeling <strong>{maxSleepMood}</strong> and you're averaging a whopping <strong>{maxSleepHours}</strong> hours of sleep on those days!
            </p>
            <ResponsiveContainer height={350}>
                <RadarChart cx="50%" cy="50%" outerRadius="90%" data={result} stroke="#7f7f7f">
                    <PolarGrid stroke="#7f7f7f" />
                    <PolarAngleAxis dataKey="mood" />
                    <PolarRadiusAxis angle={65} domain={[0, 9]} type="number" stroke="#7f7f7f" />
                    <Radar dataKey="sleep" stroke="#aa1f22" strokeWidth={2} fill="#e85a4f" fillOpacity={0.6} />
                    <Tooltip
                        content={<MoodRadarToolTip />}
                    />
                </RadarChart>
            </ResponsiveContainer>

        </div>
    )
}


export default MoodRadar;