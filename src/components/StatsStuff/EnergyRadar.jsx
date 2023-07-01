import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadarChart, Tooltip, Radar, Legend, ResponsiveContainer } from "recharts"

function EnergyRadar({ currentUser }) {

    const energySleepAverages = {};

    for (const post of currentUser.posts) {
        const { energy, sleep } = post;
        if (!energySleepAverages[energy]) {
            energySleepAverages[energy] = [];
        }
        energySleepAverages[energy].push(parseFloat(sleep));
    }

    const result = Object.entries(energySleepAverages).map(([energy, sleepValues]) => {
        const averageSleep = (sleepValues.reduce((sum, value) => sum + value, 0) / sleepValues.length).toFixed(2);
        return {
            energy,
            sleep: parseFloat(averageSleep),
        };
    });
    console.log("this is results: ", result);

    function EnergyRadarToolTip({ active, payload, label }) {
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
    let maxSleepEnergy = "";

    result.forEach(entry => {
        if (entry.sleep > maxSleepHours) {
            maxSleepHours = entry.sleep;
            maxSleepEnergy = entry.energy;
    }});


    return (
        <div className="stat-box">
            <h2>Average Sleep Distribution vs Energy </h2>
            <p>
                This radar graph shows the average distribution of your energy each day compared to how much sleep you get. Most days you report feeling <strong>{maxSleepEnergy}</strong> and you're averaging a whopping <strong>{maxSleepHours}</strong> hours of sleep on those days! 
            </p>
            <ResponsiveContainer height={350}>
            <RadarChart outerRadius="90%" cx="50%" cy="50%" data={result} stroke="#7f7f7f" fill="#000000">
                <PolarGrid fill="#000000" stroke="#7f7f7f"/>
                <PolarAngleAxis dataKey="energy" />
                <PolarRadiusAxis angle={65} domain={[0, 'auto']} type="number" stroke="#7f7f7f" />
                <Radar dataKey="sleep" stroke="#aa1f22" strokeWidth={2} fill="#e85a4f" fillOpacity={0.5} />
                <Tooltip 
                    content={<EnergyRadarToolTip />}
                />
            </RadarChart>
            </ResponsiveContainer>

        </div>
    )
}

export default EnergyRadar;