import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles.scss";

function Navbar({searchName, setSearchName, handleSearch}) {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <header>
            <h3>Family Tree</h3>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="/#">Load Full Tree</a>
                <a href="/#">About me</a>
                <div className="search-container">
                <input
                        type="text"
                        placeholder="Search for a name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
