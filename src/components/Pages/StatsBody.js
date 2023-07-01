import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SleepByDayBar from '../StatsStuff/SleepByDayBar';
import MoodAndEnergyBar from '../StatsStuff/MoodAndEnergyBar';
import EnergyPie from '../StatsStuff/EnergyPie';
import MoodPie from '../StatsStuff/MoodPie';
import MoodRadar from '../StatsStuff/MoodRadar';
import EnergyRadar from '../StatsStuff/EnergyRadar';
import ChartReadMoreToggle from '../StatsStuff/ChartReadMoreToggle';

function StatsBody({ currentUser }) {
    console.log("this is your currentUSer from the stats page: ", currentUser)

    const [chartToggle, setChartToggle] = useState({});
    const [postsArray, setPostsArray] = useState([]);

    useEffect(() => {
        if (currentUser.posts) {
            const posts = Object.entries(currentUser.posts).map(([id, post]) => {
                return {
                    ...post,
                    id
                }
        });
        setPostsArray(posts);
    }
    }, [currentUser]);


    const newUser = {
        ...currentUser,
        posts: postsArray
    };
    console.log("new user is like this now: ", newUser)

    
    function toggleChart(chartId) {
        setChartToggle(prevState => ({
            ...prevState,
            [chartId]: !prevState[chartId]
        }));
    }

    if (postsArray.length === 0) {
        return (
            <div className="pageBody">
                <h1 style={{marginBottom: 0}}>Hey there, {currentUser.username}!</h1>
                <p style={{padding: "5px", fontSize: "18px", textAlign: "center"}}>
                    Welcome aboard! I see your curiosity is at its peak as ou explore the platform. You don't have any posts saved so there's nothing that I can show you just yet. Why don't you go ahead and click that lovely button down there and fire off your first post? Once you've done that, return to this page and explore the fascinating graphs and insights I have prepared just for you!
                </p>
                <Link to="/newForm" className="toggleFilterBtn">Create New Entry</Link>

            </div>
        )
    }

    return (
        <div className="pageBody">
            <p style={{fontSize: "2rem"}}>DONE</p>
            <h1 style={{marginBottom: 0}}>Hello, {newUser.username}</h1>
            <p style={{ padding: "5px"}}>
                Welcome to the Stats page! Here you'll find some fascinating graphs to help you visualize your mood, energy, and sleep patterns.  Click each tab to reveal the relevant graph and explore your well-being in a visual way. Dive into the data and uncover intriguing insights about yourself. Let the graphs tell your story.
            </p>
            <span className={`stat-row ${chartToggle['chart1'] ? 'active' : ''}`} 
                onClick={() => toggleChart('chart1')}>
                Average Sleep per Day <span>{chartToggle['chart1'] ? 'X' : '='}</span>
            </span>
            { chartToggle['chart1'] ? <SleepByDayBar currentUser={newUser} /> : <ChartReadMoreToggle /> }

            <span className={`stat-row ${chartToggle['chart2'] ? 'active' : ''}`} 
                onClick={() => toggleChart('chart2')}>
                Tracking Mood and Energy Through the Week <span>{chartToggle['chart2'] ? 'X' : '='}</span>
            </span>
            { chartToggle['chart2'] ? <MoodAndEnergyBar currentUser={newUser} /> : <ChartReadMoreToggle /> }

            <span className={`stat-row ${chartToggle['chart3'] ? 'active' : ''}`} 
                onClick={() => toggleChart('chart3')}>
                Energy Totals <span>{chartToggle['chart3'] ? 'X' : '='}</span>
            </span>
            { chartToggle['chart3'] ? <EnergyPie currentUser={newUser} /> : <ChartReadMoreToggle /> }

            <span className={`stat-row ${chartToggle['chart4'] ? 'active' : ''}`} 
                onClick={() => toggleChart('chart4')}>
                Mood Totals <span>{chartToggle['chart4'] ? 'X' : '='}</span>
            </span>
            { chartToggle['chart4'] ? <MoodPie currentUser={newUser} /> : <ChartReadMoreToggle /> }

            <span className={`stat-row ${chartToggle['chart5'] ? 'active' : ''}`} 
                onClick={() => toggleChart('chart5')}>
                Sleep vs Energy <span>{chartToggle['chart5'] ? 'X' : '='}</span>
            </span>
            { chartToggle['chart5'] ? <EnergyRadar currentUser={newUser} /> : <ChartReadMoreToggle /> }

            <span className={`stat-row ${chartToggle['chart6'] ? 'active' : ''}`} 
                onClick={() => toggleChart('chart6')}>
                Sleep vs Mood <span>{chartToggle['chart6'] ? 'X' : '='}</span>
            </span>
            { chartToggle['chart6'] ? <MoodRadar currentUser={newUser} /> : <ChartReadMoreToggle /> }
        </div>
    );
}

export default StatsBody;