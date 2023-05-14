import React, { useRef, useEffect, useState } from "react";
import "../styles.scss";
import Tree from "react-d3-tree";
import { useGlobalContext } from "../context/global"
import initialTreeData from "../Data.json"

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


function FamilyTree() {

    const { treeData } = useGlobalContext();

    const tree = useRef();

    const [dimensions, setDimensions] = useState({
        width: innerWidth,
        height: innerHeight
    });

    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setTranslate({
            x: dimensions.width / 2,
            y: dimensions.height / 2 / 2 / 2
        });
    }, [dimensions]);


    return (
        <div className="App">
            <div
                id="treeWrapper"
                style={{ width: innerWidth, height: innerHeight }}
            >
                <Tree
                    data={treeData ? treeData : initialTreeData}
                    ref={tree}
                    translate={translate}
                    depthFactor={160}
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

export default FamilyTree
