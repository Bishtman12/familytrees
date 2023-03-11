import React from "react";
import "./styles.scss";

export default function Navbar() {

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light ">
                <a className="navbar-brand hoverable mx-4 my-8" href="/">Bisht Family Tree</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse my-4 mx-5" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <a className="nav-link disabled hoverable" href="/home">Home</a>
                        <a className="nav-link disabled hoverable" href="/about">About</a>
                    </ul>
                    <a className="nav-link disabled hoverable margin-right" href="/"> Load Full Tree </a>
                    <form className="form-inline my-2 my-lg-0">
                        <div className="input-group">
                            <input type="text" autoComplete="off" className="form-control" placeholder="Search" aria-label="Search" name="q"  />
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    )
};