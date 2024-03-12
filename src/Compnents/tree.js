import React, { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useGlobalContext } from "../context/global";
import initialTreeData from "../Data.json";
import styled from "styled-components";
import { Link } from "react-router-dom";

const svgSquare = {
  shape: "node",
  shapeProps: {
    height: 5,
    width: 10,
  },
};

const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;

function NodeLabel(node) {
  const { nodeData } = node;
  const hasChildren = nodeData._children;
  let btnClass = hasChildren ? "frame" : "frame-secondary";
  if (nodeData.is_current) {
    btnClass = "button";
  }
  return (
    <button className={btnClass}>
      {nodeData.name}
      <Link to={`/tree/${nodeData.user_id}`} className="btn">
        <i className="fas fa-info"></i>
      </Link>
    </button>
  );
}

function FamilyTree() {
  const { treeData } = useGlobalContext();

  const tree = useRef();

  const [dimensions, setDimensions] = useState({
    width: innerWidth,
    height: innerHeight,
  });

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTranslate({
      x: dimensions.width / 2,
      y: dimensions.height / 2 / 2 / 2,
    });
  }, [dimensions]);

  return (
    <TreeStyled>
      <div className="App">
        <div id="treeWrapper" style={{ width: innerWidth, height: innerHeight }}>
          <Tree
            data={treeData ? treeData : initialTreeData}
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
                strokeWidth: "1px",
              },
            }}
            nodeSize={{
              x: 170,
              y: 100,
            }}
            orientation="vertical"
            allowForeignObjects
            nodeLabelComponent={{
              render: <NodeLabel className="myLabelComponentInSvg" />,
              foreignObjectWrapper: {
                y: -5,
                x: -50,
              },
            }}
            separation={{
              siblings: 1.2,
              nonSiblings: 2.5,
            }}
          />
        </div>
      </div>
    </TreeStyled>
  );
}

const TreeStyled = styled.div`
  .frame {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    max-width: 90%;
    padding: 0 10px;
    box-sizing: border-box;
    position: relative;
    box-shadow: -7px -7px 20px 0px #fff9,
                -4px -4px 5px 0px #fff9,
                7px 7px 20px 0px #0002,
                4px 4px 5px 0px #0001,
                inset 0px 0px 0px 0px #fff9,
                inset 0px 0px 0px 0px #0001,
                inset 0px 0px 0px 0px #fff9,
                inset 0px 0px 0px 0px #0001;
    transition: box-shadow 0.6s cubic-bezier(.79,.21,.06,.81);
    border-radius: 10px;
    border :none;
  }

  .frame-secondary {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: red;
    height: 60px;
    max-width: 90%;
    padding: 0 10px;
    box-sizing: border-box;
    position: relative;
    box-shadow: -7px -7px 20px 0px #ff9999, /* Red shadow color */
                -4px -4px 5px 0px #ff9999, /* Red shadow color */
                7px 7px 20px 0px #ff0000, /* Red shadow color */
                4px 4px 5px 0px #ff0000, /* Red shadow color */
                inset 0px 0px 0px 0px #ff9999, /* Red shadow color */
                inset 0px 0px 0px 0px #ff0000, /* Red shadow color */
                inset 0px 0px 0px 0px #ff9999, /* Red shadow color */
                inset 0px 0px 0px 0px #ff0000; /* Red shadow color */
    transition: box-shadow 0.6s cubic-bezier(.79,.21,.06,.81);
    border-radius: 10px;
    border: none;
  }
  
  .btn {
    height: 25px;
    width: 25px;
    border-radius: 3px;
    background: #e0e5ec;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left:12px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
    box-shadow: -7px -7px 20px 0px #fff9,
                -4px -4px 5px 0px #fff9,
                7px 7px 20px 0px #0002,
                4px 4px 5px 0px #0001;
    transition: box-shadow 0.6s cubic-bezier(.79,.21,.06,.81);
    font-size: 8px;
    color: #666;
    text-decoration: none;
  }
  
  .btn:hover {
    background: radial-gradient(circle, #0ff 0%, #e0e5ec 60%);
    color: rgba(102, 102, 102, .5);
    animation: colorchange 3s linear infinite;
  }
  
  .btn:active {
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .5),
                -4px -4px 6px 0 rgba(116, 125, 136, .2),
                inset -4px -4px 6px 0 rgba(255, 255, 255, .5),
                inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  }
  
  @keyframes colorchange {
    to {
      filter: hue-rotate(360deg);
    }
  }
  
  @media (max-width: 768px) {
    .frame {
      max-width: 90%;
    }
  }
  
  @media (max-width: 480px) {
    .frame {
      flex-direction: column;
      height: auto;
    }
  }`;

export default FamilyTree;
