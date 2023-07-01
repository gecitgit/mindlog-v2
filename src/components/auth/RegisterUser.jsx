import React, { useEffect, useState } from "react";
import { auth, database, provider } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { set, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { toast } from "react-toastify";


function signUpWithEmailAndPassword(email, password) {
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
        } else {
            console.error("user already exists in db")
        }
    } catch (error) {
        console.error("error checking user existence", error);
    }
}


function RegisterUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordError, setPasswordError] = useState(null);

    useEffect(() => {
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
        } else if (password !== passwordConfirm) {
            setPasswordError("Passwords do not match.");
        } else {
            setPasswordError(null);
        }
    }, [password, passwordConfirm]);

    function handleSignUp(e, signUpFunction) {
        e.preventDefault();

        if (passwordError) {
            return;
        }

        signUpFunction()
            .then((userCredential) => {
                toast.success("Successfully signed up!");
                addNewUserToDB(userCredential);
            })
            .catch((error) => {
                console.error('sign-up error: ', error);
                toast.error("There was an issue signing up." , error);
            });
    }

    function handleSignUpWithEmailPassword(e) {
        e.preventDefault();
    
        if (passwordError) {
            return;
        }
    
        signUpWithEmailAndPassword(email, password)
            .then((userCredential) => {
                toast.success("Successfully signed up!");
                addNewUserToDB(userCredential);
            })
            .catch((error) => {
                console.error('sign-up error: ', error);
                toast.error("There was an issue signing up." , error);
            });
    }

    function handleSignUpWithGoogle(e) {
        e.preventDefault();
    
        signUpWithGoogle()
            .then((userCredential) => {
                toast.success("Successfully signed up!");
                addNewUserToDB(userCredential);
            })
            .catch((error) => {
                console.error('sign-up error: ', error);
                toast.error("There was an issue signing up." , error);
            });
    }

    return (
        <div className="auth-prompt">
            <form onSubmit={handleSignUpWithEmailPassword}>
                <div className="auth-form-box">
                    <div className="auth-form-header">
                        <h1 className="auth-form-h1">Sign up for <span>MindLOG</span>!</h1>
                    </div>
                    <div className="auth-form-body">
                        <div className="auth-form-body-input">
                            <label htmlFor="user-email">Email</label>
                            <input 
                                autoFocus
                                type="email"
                                id="user-email"
                                placeholder="enter your email"
                                autoComplete="on"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="auth-form-body-input">
                            <label htmlFor="user-password">Password</label>
                            <input 
                                type="password"
                                id="user-password"
                                placeholder="enter your password"
                                autoComplete="on"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="auth-form-body-input">
                            <label htmlFor="user-password-confirm">Confirm your password</label>
                            <input 
                                type="password"
                                id="user-password-confirm"
                                placeholder="confirm your password"
                                autoComplete="on"
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </div>
                        <div className="auth-form-body-input">
                            {passwordError && <p>{passwordError}</p>}
                        </div>
                        <div className="auth-form-body-bttn-box">
                            <button type="submit" className="auth-form-body-bttn">Sign Up</button>
                        </div>
                    </div>
                    <div className="auth-form-footer">
                        <button className="google-social" onClick={handleSignUpWithGoogle}>
                            <FcGoogle className="google-social-icon" /><span>Sign up with Google</span>
                        </button>
                        <span className="auth-form-calltoaction">
                            Already have an accont? <Link to="/login" style={{ color: "#e85a4f", fontWeight: "bolder"}}><u>Log in!</u></Link>
                    </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterUser;