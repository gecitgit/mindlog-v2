import React, { useState } from 'react'
import { auth, provider } from '../../firebase'
import { signInWithEmailAndPassword as signInWithEmail, signInWithPopup } from 'firebase/auth'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { set, ref, get } from 'firebase/database';
import { database } from '../../firebase';

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
                console.log('user credential:', userCredential)
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        toast.error('Email address is incorrect or not registered.');
                        break;
                    case 'auth/wrong-password':
                        toast.error('Incorrect password.');
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
                console.log("User data saved successfully");
            } else {
                console.log("User data already exists");
            }
        } catch (error) {
            console.log("error signing in with google: ", error);
        }
    };

    return (
        <div className='sign-in-container'>
            <form onSubmit={handleSignIn}>
                <h1>Log In</h1>
                <input
                    type='email'
                    placeholder='enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type='password'
                    placeholder='enter your password'
                    autoComplete='on'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type='submit'>Log In</button>
                <button onClick={handleSignInWithGoogle}>G - Sign In With Google</button>
                <br />
                <span>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </span>
            </form>
        </div>
    )
}

export default LoginUser;
