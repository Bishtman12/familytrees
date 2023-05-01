import { BrowserRouter, Routes, Route } from "react-router-dom";
import FamilyTree from './Compnents/tree'
import React from "react";
import About from "./Compnents/about";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FamilyTree />} />
                <Route path="/tree/:id" element={<FamilyTree />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App