import React, { useState } from "react";

function ChooseUsername({ onUsernameSubmit, currentUser }) {
    const [username, setUsername] = useState("");

    let usersEmail = currentUser ? currentUser.email : 'anonymous';

    let stutter1 = usersEmail.slice(0,2);
    let stutter2 = usersEmail.slice(0,1);
    let stutter3 = usersEmail.slice(0,3);
    let stutter4 = usersEmail.slice(0,4);

    function handleSubmit(e) {
        e.preventDefault();
        onUsernameSubmit(username);
    };

    function handleChange(e) {
        setUsername(e.target.value);
    }

    return (
        <div className="auth-layout-container">
            <div className="auth-prompt">
                <form onSubmit={handleSubmit}>
                    <div className="auth-form-box">
                        <div className="auth-form-header">
                            <h1 className="h1-auth">Hold up!</h1>
                            <p style={{ padding: "5px" }}>
                                Hey there {`${stutter1}... ${stutter2}... ${stutter3}.. ${stutter4}...`} hmph, that's a mouthful huh? Let's pick a cool username together!
                            </p>
                            <p style={{padding: "5px"}}>Feel free to use any combination of capital or lowercase letters and numbers from 0 to 9. Let your imagination run wild!</p>
                        </div>
                        <div className="auth-form-body">
                            <div className="auth-form-body-input">
                                <label htmlFor="username">Username: </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="...who are you?"
                                    required
                                    min={2}
                                    maxLength={12}
                                    pattern="[a-zA-Z0-9]+"
                                    value={username}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="auth-form-body-bttn">Let's go!</button>
                        </div>
                        <div className="auth-form-footer">
                            <p style={{ textAlign: "center", fontWeight: "bolder", color: "red", padding: "5px"}}>
                                Note: You will not be able to change your name once you submit it. Choose wisely!
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChooseUsername;