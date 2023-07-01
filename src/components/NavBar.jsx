import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    useEffect(() => {
        if(isMenuOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [isMenuOpen]);

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
                {isMobile ? (
                    <>
                        <div className="navBarRightBox">
                            <FaBars className={menuToggleClass} onClick={handleMenuToggle} />
                        </div>
                        {isMenuOpen && (
                            <div onClick={() => setIsMenuOpen(false)} className="modal-overlay-navbar">
                                <div className="dropdownMenu" onClick={e => e.stopPropagation()}>
                                    <div className="dropdownContent">
                                        <NavLink 
                                            to="/newForm" 
                                            className="navBarChildDrop"
                                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        >
                                            Form
                                        </NavLink>
                                        <RxDividerHorizontal />
                                        <NavLink to="/log" className="navBarChildDrop" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                            Log
                                        </NavLink>
                                        <RxDividerHorizontal />
                                        <NavLink to="/stats" className="navBarChildDrop" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                            Stats
                                        </NavLink>
                                        <RxDividerHorizontal />
                                        <NavLink to="/profile" className="navBarChildDrop" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                            Profile
                                        </NavLink>
                                        <RxDividerHorizontal />
                                        <ReactConfirmPopup
                                            className="navBarChildDrop"
                                            trigger={<button className="navBarLogout">Logout <TbLogout /></button>}
                                            title="Are you sure you want to logout?"
                                            onConfirmClicked={userSignOut}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
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
                            title="Are you sure you want to logout?"
                            onConfirmClicked={userSignOut}
                        />
                    </div>
                )}
            </div>
        </div>
    )
    
}

export default NavBar;