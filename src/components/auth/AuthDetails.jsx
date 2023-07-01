import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import HomeLayout from './HomeLayout';
import AuthLayout from './AuthLayout';
import { toast } from 'react-toastify';

function userSignOut() {
    signOut(auth)
        .then(() => {
            toast.success("signed out successfully");
        })
        .catch((error) => {
            toast.error("error occured while signing out");
        });
};

function AuthDetails() {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const cleanAuthListener = onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
        });
        return () => cleanAuthListener();
    }, [])

    return (
        <div className='authDetailsContainer'>
            { authUser ? (
                <HomeLayout userID={authUser.uid} userSignOut={userSignOut} auth={auth}/>
            ) : (
                <AuthLayout />
            )}
        </div>
    )
}

export default AuthDetails;
