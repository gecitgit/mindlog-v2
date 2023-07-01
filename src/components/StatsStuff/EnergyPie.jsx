import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text id="pie-chart-text-anchor" x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} >
                {payload.name} - {(percent * 100).toFixed(2)}%
            </text>
            <Sector 
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                backgroundColor={"red"}
            />
            <Sector 
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Count: ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


function EnergyPie({ currentUser }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const energyData = {};

    for (const post of currentUser.posts) {
        const energy = post.energy;
        if (energyData.hasOwnProperty(energy)) {
            energyData[energy]++;
        } else {
            energyData[energy] = 1;
        }
    }

    const data = Object.entries(energyData).map(([name, value]) => ({ name, value }));


    const energyColors = {
        Motivated: "#FC842C",
        Lethargic: "#BD648E",
        Restless: "#547484",
        Calm: "#95675B",
        Numb: "#371219",
    };

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };
    console.log("energy datA: ", energyData)

    // const legendFormatter = (value: string, entry: any) => {
    //     const { color } = entry;

    //     return <span style={{ color, backgroundColor: "white" }}>{value}</span>
    // }

    let maxEnergyKey = 0;
    let maxEnergyValue = Number.NEGATIVE_INFINITY;
    
    for (const [key, value] of Object.entries(energyData)) {
        if (value > maxEnergyValue) {
            maxEnergyKey = key;
            maxEnergyValue = value;
        }
    }


    return (
        <div className="stat-box">
            <h2>Total Energy Distribution</h2>
            <p>
                The pie chart below shows you the breakdown of how often you reported a certain Energy for the day.  Over the <strong>{currentUser.posts.length}</strong> days you've logged your feelings you most commonly reported feeling <strong>{maxEnergyKey}</strong>.  This happened on <strong>{maxEnergyValue}</strong> different occassions so far!
            </p>
            <ResponsiveContainer height={350}>
                <PieChart >
                    <Legend 
                        // formatter={legendFormatter}
                        align="center" 
                        height={36} 
                        verticalAlign="bottom"
                        iconType="diamond"
                        wrapperStyle={{
                            padding: "0px",
                            margin: "0",
                            fontWeight: "bold",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            stroke: "black"

                        }}
                    />
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        fill="#1f1f1f"
                        dataKey="value"
                        legendType="square"
                        paddingAngle={1}
                        onMouseEnter={onPieEnter}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={energyColors[entry.name]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EnergyPie;