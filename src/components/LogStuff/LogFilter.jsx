import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function LogFilter({ onFilterSubmit, posts }) {
    const [postDates, setPostDates] = useState([]);
    console.log("this is what posts looks like: ", posts)

    useEffect(() => {
        if (posts) {
            const dates = Object.values(posts).map((post) => post.date);
            const sortedDates = dates.sort((a, b) => new Date(a) - new Date(b));
            setPostDates(sortedDates);
    
            if (sortedDates.length > 0) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    dateRange: {
                        start: sortedDates[0],
                        end: sortedDates[sortedDates.length - 1],
                    },
                }));
            }
        }
    }, [posts]);
    


    const [formData, setFormData] = useState({
        days: [],
        dateRange: {
            start: postDates.length > 0 ? postDates[0] : '',
            end: postDates.length > 0 ? postDates[postDates.length - 1] : '',
        },
        sleep: [],
        mood: [],
        energy: [],
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        if (type === "checkbox") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: checked
                    ? [...prevFormData[name], value]
                    : prevFormData[name].filter((item) => item !== value),
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                dateRange: {
                    ...prevFormData.dateRange,
                    [name]: value,
                },
            }));
        }
    }


    function handleSubmit(event) {
        event.preventDefault();
        
        const startDate = new Date(formData.dateRange.start);
        const endDate = new Date(formData.dateRange.end);
        
        if (endDate < startDate) {
            toast.error("Your filter end date cannot be before the start date!");
            return;
        }
        
        console.log("Submit form for filter was pressed: ", formData)
        onFilterSubmit(formData);
    }

    return (
        <div className="logFilterBody">
            <span>Filter your journal entries effortlessly by day of the week, date, hours of sleep, mood, and energy. Remember to press the 'Update my posts!' button anytime you change something to apply your filters!</span>

            <form onSubmit={handleSubmit}>
            <div className="logFilterHolder">
                <fieldset className='filterOptions' id="weekdays">
                    <legend>Filter by Weekday</legend>
                    <div>
                        <input 
                            type="checkbox" 
                            id="Sunday" 
                            name="days" 
                            defaultChecked={formData.days.includes("Sunday")} 
                            value="Sunday" 
                            onChange={handleChange}
                        />
                        <label htmlFor="Sunday">Sunday</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="Monday" 
                            name="days" 
                            defaultChecked={formData.days.includes("Monday")}
                            value="Monday"
                            onChange={handleChange}
                        />
                        <label htmlFor="Monday">Monday</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="Tuesday" 
                            name="days" 
                            defaultChecked={formData.days.includes("Tuesday")}
                            value="Tuesday" 
                            onChange={handleChange}
                        />
                        <label htmlFor="Tuesday">Tuesday</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="Wednesday" 
                            name="days" 
                            defaultChecked={formData.days.includes("Wednesday")}
                            value="Wednesday" 
                            onChange={handleChange}
                        />
                        <label htmlFor="Wednesday">Wednesday</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="Thursday" 
                            name="days" 
                            defaultChecked={formData.days.includes("Thursday")}
                            value="Thursday" 
                            onChange={handleChange}
                        />
                        <label htmlFor="Thursday">Thursday</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="Friday" 
                            name="days" 
                            defaultChecked={formData.days.includes("Friday")}
                            value="Friday"
                            onChange={handleChange}
                        />
                        <label htmlFor="Friday">Friday</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="Saturday" 
                            name="days" 
                            defaultChecked={formData.days.includes("Saturday")}
                            value="Saturday" 
                            onChange={handleChange}
                        />
                        <label htmlFor="Saturday">Saturday</label>
                    </div>
                </fieldset>
                

                <fieldset className='filterOptions' id="dates">
                    <legend>Filter by Date</legend>
                    <div>
                        <label htmlFor="start">Pick the start date: </label>
                        <br />
                        <input 
                            type="date" 
                            id="start" 
                            name="start" 
                            value={formData.dateRange.start} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="end">Pick the end date: </label>
                        <br />
                        <input 
                            type="date" 
                            id="end" 
                            name="end" 
                            value={formData.dateRange.end} 
                            onChange={handleChange} 
                        />
                    </div>
                </fieldset>

                <fieldset className='filterOptions' id="sleep">
                    <legend>Filter by Sleep</legend>
                    <div>
                        <input 
                            type="checkbox" 
                            id="zeroone" 
                            name="sleep" 
                            defaultChecked={formData.sleep.includes("0 - 1 hours")}
                            value="0 - 1 hours" 
                            onChange={handleChange}
                        />
                        <label htmlFor="zeroone">0 - 1 hours</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="twothree" 
                            name="sleep" 
                            defaultChecked={formData.sleep.includes("2 - 3 hours")}
                            value="2 - 3 hours" 
                            onChange={handleChange}
                        />
                        <label htmlFor="twothree">2 - 3 hours</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="fourfive" 
                            name="sleep" 
                            defaultChecked={formData.sleep.includes("4 - 5 hours")}
                            value="4 - 5 hours"
                            onChange={handleChange}
                        />
                        <label htmlFor="fourfive">4 - 5 hours</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="sixseven" 
                            name="sleep" 
                            defaultChecked={formData.sleep.includes("6 - 7 hours")}
                            value="6 - 7 hours"
                            onChange={handleChange}
                        />
                        <label htmlFor="sixseven">6 - 7 hours</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="eightnine" 
                            name="sleep" 
                            defaultChecked={formData.sleep.includes("8 - 9 hours")}
                            value="8 - 9 hours"
                            onChange={handleChange}
                        />
                        <label htmlFor="eightnine">8 - 9 hours</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="tenplus" 
                            name="sleep" 
                            defaultChecked={formData.sleep.includes("10+ hours")}
                            value="10+ hours" 
                            onChange={handleChange}
                        />
                        <label htmlFor="tenplus">10+ hours</label>
                    </div>
                </fieldset>

                <fieldset className='filterOptions' id="mood">
                    <legend>Filter by Mood</legend>
                    <div >
                        <input 
                            type="checkbox" 
                            id="ecstatic" 
                            name="mood" 
                            defaultChecked={formData.mood.includes("ecstatic")}
                            value="ecstatic"
                            onChange={handleChange}
                        />
                        <label htmlFor="ecstatic">🤩 Ecstatic</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="happy" 
                            name="mood" 
                            defaultChecked={formData.mood.includes("happy")}
                            value="happy"
                            onChange={handleChange}
                        />
                        <label htmlFor="happy">😀 Happy</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="neutral" 
                            name="mood" 
                            defaultChecked={formData.mood.includes("neutral")}
                            value="neutral" 
                            onChange={handleChange}
                        />
                        <label htmlFor="neutral">😐 Neutral</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="anxious" 
                            name="mood" 
                            defaultChecked={formData.mood.includes("anxious")} 
                            value="anxious" 
                            onChange={handleChange}
                        />
                        <label htmlFor="anxious">😰 Anxious</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="scared" 
                            name="mood" 
                            defaultChecked={formData.mood.includes("scared")} 
                            value="scared" 
                            onChange={handleChange}
                        />
                        <label htmlFor="scared">😨 Scared</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="sad" 
                            name="mood" 
                            defaultChecked={formData.mood.includes("sad")} 
                            value="sad" 
                            onChange={handleChange}
                        />
                        <label htmlFor="sad">😢 Sad</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="angry" 
                            name="mood" 
                            defaultChecked={formData.mood.includes("angry")}
                            value="angry" 
                            onChange={handleChange}
                        />
                        <label htmlFor="angry">😡 Angry</label>
                    </div>
                </fieldset>

                <fieldset className='filterOptions' id="energy">
                    <legend>Filter by Energy</legend>
                    <div >
                        <input 
                            type="checkbox" 
                            id="motivated" 
                            name="energy" 
                            defaultChecked={formData.energy.includes("motivated")} 
                            value="motivated" 
                            onChange={handleChange}
                        />
                        <label htmlFor="motivated">Motivated</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="lethargic" 
                            name="energy" 
                            defaultChecked={formData.energy.includes("lethargic")} 
                            value="lethargic" 
                            onChange={handleChange}
                        />
                        <label htmlFor="lethargic">Lethargic</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="restless" 
                            name="energy" 
                            defaultChecked={formData.energy.includes("restless")} 
                            value="restless" 
                            onChange={handleChange}
                        />
                        <label htmlFor="restless">Restless</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="calm" 
                            name="energy" 
                            defaultChecked={formData.energy.includes("calm")}
                            value="calm" 
                            onChange={handleChange}
                        />
                        <label htmlFor="calm">Calm</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="numb" 
                            name="energy" 
                            defaultChecked={formData.energy.includes("numb")} 
                            value="numb" 
                            onChange={handleChange}
                        />
                        <label htmlFor="numb">Numb</label>
                    </div>
                </fieldset>

            </div>
                <button type="submit" className='updateFilter'>Update my posts!</button>
            </form>

            

        </div>
        
    )
}

export default LogFilter;