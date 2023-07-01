import { useState } from 'react';
import { loremIpsum } from "lorem-ipsum";
import { Navigate } from 'react-router-dom';

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

    return (
        <div className="pageBody">
            <form onSubmit={handleSubmit} className='newPostForm'>
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
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>

                <button id="formSubmit" type="submit" value="submit form">Add your post!</button>
                </fieldset>
            </form>
        </div>
    )
}

export default NewEntryForm;