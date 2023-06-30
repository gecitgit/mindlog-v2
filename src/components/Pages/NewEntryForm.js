import { useState } from 'react';
import { loremIpsum } from "lorem-ipsum";

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function NewEntryForm({ onPostSubmit }) {
    const [formData, setFormData] = useState({ 
        day: "",
        date: "",
        time: "",
        sleep: "",
        mood: "",
        energy: "",
        notes: "",
    });

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("form was submitted with this: ", formData);

        const selectedDate = new Date(`${formData.date} ${formData.time}`);
        const dayOfWeek = selectedDate.toLocaleDateString(undefined, { weekday: 'long' });

        const postData = {
            day: dayOfWeek,
            date: formData.date,
            time: formData.time,
            sleep: formData.sleep,
            mood: formData.mood,
            energy: formData.energy,
            notes: formData.notes,
        };
        
        onPostSubmit(postData);
        console.log("post data here: ", postData)
    }

    const LoremIpsum = require("lorem-ipsum").LoremIpsum;
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });

    function handleRandomPosts() {
        const numPosts = prompt("enter a number of random posts to generate");
        for (let i = 0; i < numPosts; i++) {
            const date = randomDate(new Date('2022-10-01'), new Date('2023-06-28'));
            const time = `${Math.floor(Math.random()*24).toString().padStart(2, '0')}:${(Math.floor(Math.random()*4)*15).toString().padStart(2, '0')}`;
            const sleep = (Math.random() * 24).toFixed(1);
            const moods = ["🤩 Ecstatic", "😀 Happy", "😐 Neutral", "😰 Anxious", "😨 Scared", "😢 Sad", "😡 Angry"];
            const mood = moods[Math.floor(Math.random() * moods.length)];
            const energies = ["Motivated", "Lethargic", "Restless", "Calm", "Numb"];
            const energy = energies[Math.floor(Math.random() * energies.length)];
            const notes = lorem.generateSentences(2);

            const postData = {
                day: date.toLocaleDateString(undefined, { weekday: 'long' }),
                date: date.toISOString().substring(0,10),  // Get date in YYYY-MM-DD format
                time: time,
                sleep: sleep,
                mood: mood,
                energy: energy,
                notes: notes,
            };

            onPostSubmit(postData);
        }
    }



    return (
        <div className="pageBody">
            <button onClick={handleRandomPosts}>Generate Random Posts</button>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Log your day!</legend>
                    <div>
                        <label htmlFor='logDate'>
                            Please choose the date:
                        </label>
                        <input 
                            required 
                            type='date' 
                            id='logDate' 
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='logTime'>
                            Please choose the time:
                        </label>
                        <input 
                            required
                            type='time'
                            id='logTime'
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='logSleep'>
                            How much sleep did you get last night?
                        </label>
                        <input 
                            required
                            type='number'
                            id='logSleep'
                            name="sleep"
                            placeholder='0-24 hours / 30m increments'
                            value={formData.sleep}
                            min="0"
                            max="24"
                            step="0.5"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='logMood'>
                            How would you describe your mood?
                        </label>
                        <select 
                            required
                            id='logMood'
                            name="mood"
                            value={formData.mood}
                            onChange={handleChange}
                        >
                            <option disabled value="">Select a mood...</option>
                            <option value="🤩 Ecstatic">Ecstatic</option>
                            <option value="😀 Happy">Happy</option>
                            <option value="😐 Neutral">Neutral</option>
                            <option value="😰 Anxious">Anxious</option>
                            <option value="😨 Scared">Scared</option>
                            <option value="😢 Sad">Sad</option>
                            <option value="😡 Angry">Angry</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='logEnergy'>
                            How would you describe your energy level?
                        </label>
                        <select
                            required
                            id='logEnergy'
                            name="energy"
                            value={formData.energy}
                            onChange={handleChange}
                        >
                            <option disabled value="">Select your energy...</option>
                            <option value="Motivated">Motivated</option>
                            <option value="Lethargic">Lethargic</option>
                            <option value="Restless">Restless</option>
                            <option value="Calm">Calm</option>
                            <option value="Numb">Numb</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='logNotes'>
                            Feel free to add any additional notes here:
                        </label>
                        <textarea
                            type='text'
                            id='logNotes'
                            name="notes"
                            placeholder='[optional] Add any additional notes here to reflect on your day...'
                            rows="5"
                            cols="50"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>

                <button id="formSubmit" type="submit" value="submit form">Submit</button>
                </fieldset>
            </form>
        </div>
    )
}

export default NewEntryForm;