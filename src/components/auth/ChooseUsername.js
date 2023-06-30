import React, { useState } from "react";

function ChooseUsername({ onUsernameSubmit, currentUser }) {
    const [username, setUsername] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onUsernameSubmit(username);
    };

    function handleChange(e) {
        setUsername(e.target.value);
    }

    return (
        <div style={{ height: "350px", width: "500px", backgroundColor: "lightslategray"}}>
            <p>this text is coing from ChooseUsername</p>
            <p>time to comply</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label> <br />
                <p>You can only use 'a-z', 'A-Z' and '0-9'</p>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="better be a good one"
                    required
                    min={2}
                    maxLength={12}
                    pattern="[a-zA-Z0-9]+"
                    value={username}
                    onChange={handleChange}
                /> <br />
                <button type="submit">Choose..your...pokemon</button>
            </form>
        </div>
    )
}

export default ChooseUsername;