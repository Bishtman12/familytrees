import React, { useState } from "react";
import "./styles.scss";

const data = require("./SEARCH.json");

export default function Navbar() {
    // Declare a state variable for the search query
    const [searchQuery, setSearchQuery] = useState("");

    // Declare a state variable for the filtered data
    const [filteredData, setFilteredData] = useState(
        Object.entries(data).map(([key, value]) => ({ key, value }))
    );

    // Define a function to filter the data based on the search query
    const filterData = (query) => {
        // Filter the data based on the query
        const filtered = Object.entries(data)
            .filter(([key]) => key.toLowerCase().includes(query.toLowerCase()))
            .map(([key, value]) => ({ key, value }));

        // Update the filtered data state variable
        setFilteredData(filtered);
    };

    // Handle the change event of the input element
    const handleChange = (event) => {
        // Update the search query state variable
        setSearchQuery(event.target.value);

        // Filter the data based on the search query
        filterData(event.target.value);
    };

    // Handle the click event of the search dropdown items
    const handleClick = (key) => {
        // Update the search query state variable with the clicked item
        setSearchQuery(key);
        // Filter the data based on the search query
        filterData(key);
        search(key);
    };

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
                            <input type="text" autoComplete="off" className="form-control" placeholder="Search" aria-label="Search" name="q" value={searchQuery} onChange={handleChange} />
                        </div>
                    </form>
                </div>
            </nav>

            {/* Display the filtered data if the search query is not empty */}
            {searchQuery && (
                <ul>
                    {filteredData.map(({ key }) => (
                        <li key={key} onClick={() => handleClick(key)}>{key}</li>
                    ))}
                </ul>
            )}
        </div>
    )
};