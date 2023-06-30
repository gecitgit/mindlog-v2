import React, { useState } from "react";
import { auth, database, provider } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { set, ref, get } from "firebase/database";
import { Link } from "react-router-dom";

function signUpWithEmailAndPassword(email, password) {
    console.log("Register with Email and password was called");
    console.log("This is the auth being passed: ", auth);
    console.log("this is the email being passed: ", email);
    return createUserWithEmailAndPassword(auth, email, password);
}

function signUpWithGoogle() {
    return signInWithPopup(auth, provider);
}

async function addNewUserToDB(userCredential) {
    const { email, uid } = userCredential.user;
    const userRef = ref(database, `users/${uid}`);

    try {
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
            const newUser = {
                email: email,
                uid: uid,
            };
            await set(userRef, newUser);
            console.log("this user was added to the database: ", newUser);
        } else {
            console.log("user already exists in db")
        }
    } catch (error) {
        console.error("error checking user existence", error);
    }
}


function RegisterUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignUp(e, signUpFunction) {
        e.preventDefault();
        signUpFunction()
            .then((userCredential) => {
                console.log("sign-up successful: ", userCredential);
                addNewUserToDB(userCredential);
            })
            .catch((error) => {
                console.error('sign-up error: ', error);
            });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            <form onSubmit={(e) => handleSignUp(e, () => signUpWithEmailAndPassword(email, password))}>
                <h1>Create an account</h1>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <br />
                <input type="password" placeholder="Password" autoComplete="on" onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Sign Up</button>
                <button onClick={(e) => handleSignUp(e, signUpWithGoogle)}>Sign Up with Google</button>
                <br />
                <span>
                    Already have an account? <Link to="/login">Log In</Link>
                </span>
            </form>
        </div>
    )
}

export default RegisterUser;