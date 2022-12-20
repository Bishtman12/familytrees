import React from "react";
import "./styles.css";

export default function Navbar() {
    return (<div>
        <nav class="navbar justify-content-between navbar-dark bg-dark">
            <a class="navbar-brand">Home</a>
            <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </nav>
    </div>
    );
};
