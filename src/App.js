import React, { useRef, useEffect, useState } from "react";
import "./styles.scss";
import Tree from "react-d3-tree";
// search funtion 
const data = require("./Data.json");
const fulldata = data.MAIN_DATA;
const searchMapping = data.SEARCH_MAPPING;
const nameIdMapping = data.NAME_ID_MAPPING;

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

function markFalse(data, id) {
    for (let ele of data.children) {
        if (ele.id == id) {
            ele._collapsed = false;
        }
        if (ele.children) {
            markFalse(ele, id)
        }
    }
}

// helper function for markCollapsed 
function helperMarkCollapsed(id) {
    // a single id is passed here
    const temp = String(id);
    let data;
    // to get the ids to be marked as collapsed = false in data
    for (let element in searchMapping) {
        if (element == temp) {
            data = searchMapping[element]
            break
        }
    }
    data = data.split(",")
    // data => contains all the ids to be marked as false [1,2,3] --> this form
    for (let ele of data) {
        markFalse(fulldata, ele)
    }
}

// function to all the ids of the node
function markCollapsed(allIds) {
    // run for each particular id
    for (let ele of allIds) {
        helperMarkCollapsed(ele);
    }
}

//Main Search function
function search(name) {
    let allIds;
    let flag = true;
    // get the all the id of the given Name
    for (let ele in nameIdMapping) {
        if (ele == name) {
            allIds = nameIdMapping[ele];
            flag = false
            break
        }
    }
    if (flag) {
        return "NOT FOUND"
    }
    markCollapsed(allIds);
    return fulldata;
}

export default function App() {

    const treeContainer = useRef();
    const tree = useRef();
    const [dimensions, setDimensions] = useState({
        width: innerWidth,
        height: innerHeight
    });
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [filteredData, setFilteredData] = useState(data);
    
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

    const handleSearch = (name) => {
        const newData = search(name)
        setFilteredData(newData);
    };

    return (
        <div className="App">
            <div
                id="treeWrapper"
                ref={treeContainer}
                style={{ width: innerWidth, height: innerHeight }}

            > <input type="text" placeholder="Search" onChange={(e) => handleSearch("Sachin Bisht")} />
                <Tree
                    data={filteredData}
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
