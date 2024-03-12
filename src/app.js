import { BrowserRouter, Routes, Route } from "react-router-dom";
import FamilyTree from './Compnents/tree'
import React from "react";
import About from "./Compnents/about";
import Homepage from "./Compnents/homepage";
import PersonalProfile from "./Compnents/userData";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/full-tree" element={<FamilyTree />} />
                <Route path="/tree/:id" element={<PersonalProfile />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
