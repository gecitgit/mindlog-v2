import { BarChart, CartesianGrid, Tooltip, YAxis, XAxis, Bar, ResponsiveContainer, Legend } from "recharts";

function MoodAndEnergyBar({ currentUser }) {
    const daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayArrays = [];

    for (const day of daysWeek) {
        dayArrays[`${day.toLowerCase()}Arr`] = [];
        for (const post of currentUser.posts) {
            if (post.day === day) {
                dayArrays[`${day.toLowerCase()}Arr`].push(post);
            }
        }
    }

    const weekArray = daysWeek.map(day => ({
        day,
        moodEcstatic: 0,
        moodHappy: 0,
        moodNeutral: 0,
        moodAnxious: 0,
        moodScared: 0,
        moodSad: 0,
        moodAngry: 0,
        energyMotivated: 0,
        energyLethargic: 0,
        energyRestless: 0,
        energyCalm: 0,
        energyNumb: 0
    }));

    function countMoodAndEnergy(arr, obj) {
        for (const post of arr) {
            const moodKey = `mood${post.mood.split(" ")[1]}`;
            const energyKey = `energy${post.energy}`;

            if (obj.hasOwnProperty(moodKey)) {
                obj[moodKey]++;
            }

            if (obj.hasOwnProperty(energyKey)) {
                obj[energyKey]++;
            }
        }
    }
    for (const dayObj of weekArray) {
        const dayArr = dayArrays[`${dayObj.day.toLowerCase()}Arr`];
        countMoodAndEnergy(dayArr, dayObj);
    }

    function MandEBarToolTip({ active, payload, label }) {
        if (active) {
            return <div className="tool-tip">
                <h4 id="tool-tip-label">{label}</h4>
                <div className="tool-tip-column-holder">
                    <div className="tool-tip-column">
                        <p id="tool-tip-column-header">Energy</p>
                        <p>Ecstatic - {payload[6].value}</p>
                        <p>Happy - {payload[5].value}</p>
                        <p>Neutral - {payload[4].value}</p>
                        <p>Anxious - {payload[3].value}</p>
                        <p>Scared - {payload[2].value}</p>
                        <p>Sad - {payload[1].value}</p>
                        <p>Angry - {payload[0].value}</p>
                    </div>
                    <div className="tool-tip-column">
                        <p id="tool-tip-column-header">Mood</p>
                        <p>Motivated - {payload[11].value}</p>
                        <p>Lethargic - {payload[10].value}</p>
                        <p>Restless - {payload[9].value}</p>
                        <p>Calm - {payload[8].value}</p>
                        <p>Numb - {payload[7].value}</p>
                    </div>
                </div>

                

            </div>
        }
    }
    console.log("this is the array data: ", weekArray)
    console.log("this is day array: ", dayArrays)

    const moodCounts = {};
    const energyCounts = {};

    weekArray.forEach(day => {
        Object.keys(day).forEach(key => {
            if (key.startsWith('mood')) {
                const mood = key.replace('mood', '');
                moodCounts[mood] = (moodCounts[mood] || 0) + day[key];
            }
        });

        Object.keys(day).forEach(key => {
            if (key.startsWith('energy')) {
                const energy = key.replace('energy', '');
                energyCounts[energy] = (energyCounts[energy] || 0) + day[key];
            }
        });
    });

    const topMood = Object.entries(moodCounts).reduce((maxMood, [mood, count]) => (count > maxMood.count ? { mood, count } : maxMood), { mood: '', count: 0 }).mood;

    const topEnergy = Object.entries(energyCounts).reduce((maxEnergy, [energy, count]) => (count > maxEnergy.count ? { energy, count} : maxEnergy), { energy: '', count: 0}).energy;

    const topMoodCount = moodCounts[topMood] || 0;
    const topEnergyCount = energyCounts[topEnergy] || 0;

    console.log("Top Mood: ", topMood);
    console.log("Top energy: ", topEnergy);
    console.log("Top mood count: ", topMoodCount);
    console.log("Top enery count: ", topEnergyCount);

    function CustomLegend({ payload }) {
        const moodItems = payload.slice(0, 7);
        const energyItems = payload.slice(7);

        const moodOrder = ['Ecstatic', 'Happy', 'Neutral', 'Anxious', 'Scared', 'Sad', 'Angry'];
        const energyOrder = ['Motivated', 'Lethargic', 'Restless', 'Calm', 'Numb'];

        const sortItems = (items, order) => {
            return order.map((value) => {
                return items.find((item) => item.value === value);
            });
        };

        const sortedMoodItems = sortItems(moodItems, moodOrder);
        const sortedEnergyItems = sortItems(energyItems, energyOrder);


        return (
            <div className="custom-legend">
                <div className="legend-category">
                    <p>Mood</p>
                    <div className="legend-item-holder">
                    {sortedMoodItems.map((entry, index) => (

                        <div key={`legend-${index}`} className="legend-item">
                            <span className="legend-icon" style={{ backgroundColor: entry.color}} />
                            <span className="legend-label">{entry.value}</span>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="legend-category">
                    <p>Energy</p>
                    <div className="legend-item-holder">

                    {sortedEnergyItems.map((entry, index) => (
                        <div key={`legend-${index}`} className="legend-item">
                            <span className="legend-icon" style={{ backgroundColor: entry.color}} />
                            <span className="legend-label">{entry.value}</span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="stat-box">
            <h2>Mood and Energy Distribution by Day</h2>
            <p>
                Below you'll find the daily distrubution of your mood and energy ratings.  Each weekday has two bars where the left represents your Mood and the right represents your Energy.  The bars represent the number of times you logged that specific Energy and Mood on the given day of the week.  
                <br />
                Over <strong>{currentUser.posts.length}</strong> entries your most commonly logged Mood was <strong>{topMood}</strong> which you logged a total of <strong>{topMoodCount}</strong> times.  Your most commonly logged Energy was <strong>{topEnergy}</strong> which you logged a total of <strong>{topEnergyCount}</strong> times so far. Scroll down to see some more indepth charts.
            </p>
            <ResponsiveContainer height={500} >
                <BarChart
                    data={weekArray}
                    margin={{ top: 5, right: 20, left: 1, bottom: 25 }}
                    padding={0}
                    style={{ backgroundColor : "#eae7dc" }}
                    >
                    <CartesianGrid 
                        strokeDasharray="4 1"
                        fill="#eae7dc"
                        fillOpacity={.3}
                        stroke="#000000"
                        strokeOpacity={0.5}
                        />
                    <XAxis 
                        dataKey="day"
                        label={{ value: "Days of the Week", position: "insideBottom", offset: "-15", fontWeight: "bold", fontSize: "18px" }}
                        fontWeight="bold"
                        />
                    <YAxis />
                    <Tooltip 
                        content={<MandEBarToolTip />}
                        />
                    <Bar dataKey="moodAngry" name="Angry" stackId="a" fill="#DC040C" stroke= "#000000"/>
                    <Bar dataKey="moodSad" name="Sad" stackId="a" fill="#233D5D" stroke= "#000000"/>
                    <Bar dataKey="moodScared" name="Scared" stackId="a" fill="#917960" stroke= "#000000"/>
                    <Bar dataKey="moodAnxious" name="Anxious" stackId="a" fill="#FCACA4" stroke= "#000000"/>
                    <Bar dataKey="moodNeutral" name="Neutral" stackId="a" fill="#F4E7CC" stroke= "#000000"/>
                    <Bar dataKey="moodHappy" name="Happy" stackId="a" fill="#FCDC2C" stroke= "#000000"/>
                    <Bar dataKey="moodEcstatic" name="Ecstatic" stackId="a" fill="#519FB8" stroke= "#000000"/>
                    <Bar dataKey="energyNumb" name="Numb" stackId="b" fill="#371219" stroke= "#000000"/>
                    <Bar dataKey="energyCalm" name="Calm" stackId="b" fill="#95675B" stroke= "#000000"/>
                    <Bar dataKey="energyRestless" name="Restless" stackId="b" fill="#547484" stroke= "#000000"/>
                    <Bar dataKey="energyLethargic" name="Lethargic" stackId="b" fill="#BD648E" stroke= "#000000"/>
                    <Bar dataKey="energyMotivated" name="Motivated" stackId="b" fill="#FC842C" stroke= "#000000"/>
                    <Legend 
                        content={<CustomLegend />}
                        verticalAlign="bottom"
                        offset={-15}
                        width="100%"
                        />
                </BarChart>
            </ResponsiveContainer>
                
            {/* </ResponsiveContainer> */}


        </div>
    )

}

export default MoodAndEnergyBar;