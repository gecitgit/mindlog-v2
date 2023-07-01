import React, { useEffect, useState } from "react";
import { auth, database, provider } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { set, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { toast } from "react-toastify";


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
                console.log("sign-up successful: ", userCredential);
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
            <form onSubmit={(e) => handleSignUp(e, () => signUpWithEmailAndPassword(email, password))}>
                <div className="auth-form-box">
                    <div className="auth-form-header">
                        <h1 className="auth-form-h1">Sign up for <span>MindLOG</span>!</h1>
                    </div>
                    <div className="auth-form-body">
                        <div className="auth-form-body-input">
                            <label htmlFor="user-email">Email</label>
                            <input 
                                autoFocus
                                required
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
                                required
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
                                required
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
                        <button className="google-social">
                            <FcGoogle className="google-social-icon" /><span>Sign up with Google</span>
                        </button>
                        <span className="auth-form-calltoaction">
                            Already have an accont? <Link to="/login" style={{ color: "#e85a4f", fontWeight: "bolder"}}><u>Log in!</u></Link>
                    </span>
                    </div>
                </div>
            </form>
        </div>
    //     <div className="login-signup-container">
    //         <form onSubmit={(e) => handleSignUp(e, () => signUpWithEmailAndPassword(email, password))}>
    //             <div>
    //                 <h1 style={{ fontSize: "35px", padding: "10px", margin: 0 }}>Sign up for <span style={{ color: "#e85a4f", fontWeight: "bolder" }}>MindLOG</span>!</h1>
    //             </div>
    //             <div className="horizontal-break"><hr /></div>
    //             <div className="login-signup-body">
    //                 <label htmlFor="email">Email</label>
    //                 <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
    //                 <label htmlFor="password">Password</label>
    //                 <input type="password" placeholder="Password" autoComplete="on" onChange={(e) => setPassword(e.target.value)} />
    //                 <label htmlFor="password">Confirm Password</label>
    //                 <input type="password" placeholder="Confirm Password" autoComplete="on" onChange={(e) => setPasswordConfirm(e.target.value)} />
    //                 {passwordError && <p style={{color: 'red'}}>{passwordError}</p>}
    //                 <button type="submit">Sign Up</button>
    //             </div>
    //             <div className="horizontal-break"><hr /></div>

    //             <div className="login-signup-footer">
    //             <button onClick={(e) => handleSignUp(e, signUpWithGoogle)}>Sign Up with Google</button>
    //             <div className="horizontal-break"><hr /></div>
                
    //             <span>
    //                 Already have an account? <Link to="/login">Log In</Link>
    //             </span>
    //             </div>
    //         </form>
    //     </div>
    // )
    )
}

export default RegisterUser;