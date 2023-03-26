import React, { useRef, useEffect, useState } from "react";
import "./styles.scss";
import Tree from "react-d3-tree";
const data = require("./Data.json");
import { FaBars, FaTimes } from "react-icons/fa";

const svgSquare = {
    shape: "node",
    shapeProps: {
        height: 5,
        width: 10
    }
};

const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;

function NodeLabel(node) {
    const { nodeData } = node;
    const hasChildren = nodeData._children;
    const btnClass = hasChildren ? "button " : "button-secondary"
    const btnStyle = {
        cursor: hasChildren ? "pointer" : "default",
    };
    return (
        <button className={btnClass} style={btnStyle}>
            {nodeData.name}
        </button>
    );
}

export default function App() {
    const [treeData, setTreeData] = useState(data);
    const [searchName, setSearchName] = useState('');

    const treeContainer = useRef();
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };
    const tree = useRef();
    const [dimensions, setDimensions] = useState({
        width: innerWidth,
        height: innerHeight
    });
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (treeContainer.current) {
            setDimensions(treeContainer.current.getBoundingClientRect());
        }
    }, [treeContainer]);

    useEffect(() => {
        setTranslate({
            x: dimensions.width / 2,
            y: dimensions.height / 2 / 2 / 2
        });
    }, [dimensions]);

    const handleSearch = () => {
        fetch(`http://localhost:8000/v1/tree/${searchName}`)
            .then((response) => response.json())
            .then((data) => setTreeData(data.result))
            .catch((error) => console.error(error));
    };

    return (
        <div className="App">
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
            <div
                id="treeWrapper"
                ref={treeContainer}
                style={{ width: innerWidth, height: innerHeight }}
            >
                <Tree
                    data={treeData}
                    ref={tree}
                    translate={translate}
                    depthFactor={160}
                    pathFunc="step"
                    collapsible={true}
                    useCollapseData={true}
                    nodeSvgShape={svgSquare}
                    styles={{
                        links: {
                            stroke: "black",
                            strokeWidth: "1px"
                        }
                    }}
                    nodeSize={{
                        x: 170,
                        y: 100
                    }}
                    orientation="vertical"
                    allowForeignObjects
                    nodeLabelComponent={{
                        render: <NodeLabel className="myLabelComponentInSvg" />,
                        foreignObjectWrapper: {
                            y: -5,
                            x: -50
                        }
                    }}
                    separation={{
                        siblings: 1.2,
                        nonSiblings: 2.5
                    }}
                />
            </div>
        </div>
    );
}
