import { BarChart, CartesianGrid, Tooltip, YAxis, XAxis, Bar, ResponsiveContainer } from "recharts";

function SleepByDayBar({ currentUser }) {
    const sleepData = {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
    };

    currentUser.posts.forEach(post => {
        const { day, sleep } = post;
        if (sleepData.hasOwnProperty(day)) {
            sleepData[day].push(sleep);
        }
    });

    const averageSleepData = Object.keys(sleepData).map(day => {
        const sleepValues = sleepData[day];
        const averageSleep = (sleepValues.length > 0 ? sleepValues.reduce((total, sleep) => total + parseInt(sleep), 0) / sleepValues.length : 0).toFixed(2);

        return {
            name: day,
            sleep: parseFloat(averageSleep),
        };
    });

    let maxSleepEntry = averageSleepData[0];
    let previousEntry = averageSleepData[0];

    for (let i = 1; i < averageSleepData.length; i++) {
        const currentEntry = averageSleepData[i];

        if (currentEntry.sleep > maxSleepEntry.sleep) {
            maxSleepEntry = currentEntry;
        }

        if (currentEntry.name === maxSleepEntry.name) {
            previousEntry = averageSleepData[i - 1];
        }
    }

    const maxSleep = maxSleepEntry.sleep;
    const dayOfLog = maxSleepEntry.name;
    const dayOfSleep = previousEntry.name;

    function SleepTooLTip({ active, payload, label }) {
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


    return (
        <div className="stat-box">
            <h2>Average Sleep Distributuion by Day</h2>
            <p>
                You have logged your sleep <strong>{currentUser.posts.length}</strong> times so far! Here's a look at how that breaks down over each day of the week.
                <br />
                It looks like <strong>{dayOfLog}</strong> is your best day for reporting sleep. Keep up whatever you're doing on <strong>{dayOfSleep}</strong> night because it's leading to <strong>{maxSleep}</strong> hours per night! Check back in later to see how this changes over time.
            </p>

            <ResponsiveContainer height={350} >
                <BarChart
                    data={averageSleepData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 25 }}
                    style={{ backgroundColor: "#eae7dc" }}
                >
                    <CartesianGrid
                        strokeDasharray="4 1"
                        fill="#eae7dc"
                        fillOpacity={.3}
                        stroke="#000000"
                    />
                    <XAxis
                        dataKey="name"
                        label={{ value: "Days of the Week", position: "insideBottom", offset: "-15", fontWeight: "bold", fontSize: "18px" }}
                        fontWeight="bold"
                    />
                    <YAxis
                        label={{ value: "Hours Slept per Night", angle: -90, position: "center", fontWeight: "bold", fontSize: "18px", dx: -10 }}
                        fontWeight="bold"
                        width={60}
                        padding={{ left: 20 }}
                    />
                    <Tooltip
                        content={<SleepTooLTip />}
                        cursor={{ stroke: '#e85a4fb4', strokeWidth: 2, fill: "#d8c3a54a", border: "1px black solid" }}
                    />
                    <Bar
                        dataKey="sleep"
                        fill="#e85a4f"
                        unit=" hours"
                        fontWeight="bold"
                        stroke="#000000"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SleepByDayBar;