import React, { useState } from 'react'
import { auth, provider } from '../../firebase'
import { signInWithEmailAndPassword as signInWithEmail, signInWithPopup } from 'firebase/auth'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { set, ref, get } from 'firebase/database';
import { database } from '../../firebase';
import { FcGoogle } from 'react-icons/fc';

const signInWithEmailAndPassword = (email, password) => {
    return signInWithEmail(auth, email, password);
};

const LoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                toast.success('Successfully logged in!');
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        toast.error('Email does not match our records.Check your spelling or visit the sign up page!');
                        break;
                    case 'auth/wrong-password':
                        toast.error('Password does not match our records. Please try again.');
                        break;
                    case 'auth/invalid-email':
                        toast.error('Please enter a valid email address.');
                        break;
                    default:
                        toast.error(`Error: ${error.code.split('/')[1]}. Please try again later.`);
                }
            });
    };

    const handleSignInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const { user } = userCredential;
            const { email, uid } = user;

            const userRef = ref(database, `users/${uid}`);
            const userSnapshot = await get(userRef);
            const userData = {
                email: email,
                uid: uid,
            };

            if (!userSnapshot.exists() || !userSnapshot.val().username) {
                userData.username = "";

                set(userRef, userData);
            } else {
                console.log("User data already exists");
            }
        } catch (error) {
            console.error("error signing in with google: ", error);
        }
    };

    return (
        <div className="auth-prompt">
            <form onSubmit={handleSignIn} title='Login form for MindLOG v2'>
            <div className='auth-form-box'>
                <div className='auth-form-header'>
                    <h1 className='auth-form-h1'>Welcome to <span>MindLOG</span>!</h1>
                </div>
                <div className='auth-form-body'>
                    <div className='auth-form-body-input'>
                        <label htmlFor='user-email'>Email</label>
                        <input 
                            autoFocus
                            type='text'
                            id='user-email'
                            placeholder='enter your email'
                            value={email}
                            autoComplete='on'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='auth-form-body-input'>
                        <label htmlFor='user-password'>Password</label>
                        <input 
                            type='password' 
                            id='user-password'
                            placeholder='enter your password'
                            value={password}
                            autoComplete='on'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='auth-form-body-bttn-box'>
                        <button type='submit' className='auth-form-body-bttn'>Login</button>
                    </div>
                </div>
                <div className='auth-form-footer'>
                    <button className="google-social" onClick={handleSignInWithGoogle}>
                        <FcGoogle className='google-social-icon' /><span>Login with Google</span>
                    </button>
                    <span className="auth-form-calltoaction">
                        Don't have an account? <Link to="/register" style={{ color: "#e85a4f", fontWeight: "bolder"}}><u>Sign Up!</u></Link>
                    </span>
                </div>
            </div>
            </form>
        </div>
    )
}

export default LoginUser;
