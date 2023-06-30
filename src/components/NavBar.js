import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import ReactConfirmPopup from "react-confirm-popup";
import { RxDividerHorizontal } from "react-icons/rx";

const mobileMediaQuery = "(max-width: 750px)";

function NavBar({ currentUser, userSignOut }) {
    const [isMobile, setIsMobile] = useState(window.matchMedia(mobileMediaQuery).matches);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuToggleClass = isMenuOpen ? "menuToggle active" : "menuToggle";
    const dropdownRef = useRef(null);

    useEffect(() => {
        const query = window.matchMedia(mobileMediaQuery);

        function handleQueryChange(queryEvent) {
            setIsMobile(queryEvent.matches);
        }

        query.addEventListener("change", handleQueryChange);

        return () => {
            query.removeEventListener("change", handleQueryChange);
        };
    }, []);

    function handleMenuToggle() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (        
        <div className="navBarStyle">
            <div className="navBarLeft">
                <NavLink to="/welcome" className="navBarChild">
                    MindLOG!
                </NavLink>
            </div>

            <div className="navBarRight">
                { isMobile ? (
                    <div className="navBarRightBox">
                        <FaBars className={menuToggleClass} onClick={handleMenuToggle} />
                        { isMenuOpen ? (
                            <div className="dropdownMenu">
                                <div className="dropdownContent">
                                    <NavLink to="/newForm" className="navBarChildDrop">
                                        Form
                                    </NavLink>
                                    <RxDividerHorizontal />
                                    <NavLink to="/log" className="navBarChildDrop">
                                        Log
                                    </NavLink>
                                    <RxDividerHorizontal />
                                    <NavLink to="/stats" className="navBarChildDrop">
                                        Stats
                                    </NavLink>
                                    <RxDividerHorizontal />
                                    <NavLink to="/profile" className="navBarChildDrop">
                                        Profile
                                    </NavLink>
                                    <RxDividerHorizontal />
                                    <ReactConfirmPopup
                                        className="navBarChildDrop"
                                        trigger={<button className="navBarLogout">Logout <TbLogout /></button>}
                                        title="you out??"
                                        onConfirmClicked={userSignOut}
                                    />
                                </div>
                            </div>
                        ) : null
                        }
                    </div>
                ) : (
                    <div className="navBarRightBox">
                        <NavLink to="/newForm" className="navBarChild">
                            Form
                        </NavLink>
                        <NavLink to="/log" className="navBarChild">
                            Log
                        </NavLink>
                        <NavLink to="/stats" className="navBarChild">
                            Stats
                        </NavLink>
                        <NavLink to="/profile" className="navBarChild">
                            Profile
                        </NavLink>
                        <ReactConfirmPopup
                            trigger={<button className="navBarLogout">Logout <TbLogout /></button>}
                            title="you out??"
                            onConfirmClicked={userSignOut}
                        />
                    </div>
                )}

                


            </div>
        </div>
    )
}

export default NavBar;


// import React, { useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import { TbLogout } from "react-icons/tb";
// import { FaBars } from "react-icons/fa";
// import { ConfirmToast } from "react-confirm-toast";
// import ReactConfirmPopup from "react-confirm-popup";

// const mobileMediaQuery = "(max-width: 750px)";

// const NavBarRightMobile = ({ handleMenuToggle, isMenuOpen }) => {
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 handleMenuToggle();
//             }
//         };

//         const handleEscKey = (event) => {
//             if (event.keyCode === 27) {
//                 handleMenuToggle();
//             }
//         };

//         if (isMenuOpen) {
//             document.addEventListener("click", handleClickOutside);
//             document.addEventListener("keydown", handleEscKey);
//         }

//         return () => {
//             document.removeEventListener("click", handleClickOutside);
//             document.removeEventListener("keydown", handleEscKey);
//         }
//     }, [handleMenuToggle, isMenuOpen]);

//     const menuToggleClass = isMenuOpen ? "menuToggle active" : "menuToggle";

//     return (
//         <div ref={dropdownRef} className={menuToggleClass} onClick={handleMenuToggle}>
//             <FaBars />
//         </div>
//     );
// };


// const NavBarRightDesk = ({ userSignOut }) => {
//     return (
//         <div className="navBarRight">
//             <NavLink to="/newForm" className="navBarChild">
//                 Form
//             </NavLink>
//             <NavLink to="/log" className="navBarChild">
//                 Log
//             </NavLink>
//             <NavLink to="/stats" className="navBarChild">
//                 Stats
//             </NavLink>
//             <NavLink to="/profile" className="navBarChild">
//                 Profile
//             </NavLink>
//             <button className="navBarLogout" onClick={userSignOut}>
//                 Logout <TbLogout />
//             </button>
//         </div>
//     );
// };

// function logoutAlert() {
//     let confirm = window.confirm("Are you sure you want to logout?");
//     if (confirm) {
//         console.log("logout confirmed");
//     } else {
//         console.log("logout cancelled");
//     }
// }

// function NavBar({ currentUser, userSignOut }) {
//     const [isMobile, setIsMobile] = useState(window.matchMedia(mobileMediaQuery).matches);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     useEffect(() => {
//         const query = window.matchMedia(mobileMediaQuery);

//         function handleQueryChange(queryEvent) {
//             setIsMobile(queryEvent.matches);
//         }

//         query.addEventListener("change", handleQueryChange);

//         return () => {
//             query.removeEventListener("change", handleQueryChange);
//         };
//     }, []);

//     const handleMenuToggle = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     return (
//         <div className="navBarStyle">
//             <button className="navBarLogout" onClick={logoutAlert}>LOGOUTpls </button>
//             <ReactConfirmPopup
//                 trigger={<button>logout v2</button>}
//                 title="you out??"
//                 onConfirmClicked={userSignOut}
//             />
//             <div className="navBarLeft">
//                 <NavLink to="/welcome" className="navBarChild">
//                     MindLOG!
//                 </NavLink>
//             </div>
//             {isMobile && <NavBarRightMobile className="navBarRight" handleMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} userSignOut={userSignOut} />}
//             <div className="navBarRight">
//                 {!isMobile ? (
//                     <NavBarRightDesk />
//                 ) : isMenuOpen ? (
//                     <div className="dropdownMenu">
//                         <div className="dropdownContent">
//                             <NavLink to="/log" className="navBarChild">
//                                 Log
//                             </NavLink>
//                             <NavLink to="/newForm" className="navBarChild">
//                                 Form
//                             </NavLink>
//                             <NavLink to="/stats" className="navBarChild">
//                                 Stats
//                             </NavLink>
//                             <NavLink to="/profile" className="navBarChild">
//                                 Profile
//                             </NavLink>
//                             <button className="navBarLogout" onClick={() => console.log("another logout will work here")}>
//                                 Logout <TbLogout />
//                             </button>
//                         </div>
//                     </div>
//                 ) : null}
//             </div>
//         </div>
//     );
// }

// export default NavBar;
