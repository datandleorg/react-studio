import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { componentsMeta } from "../data/componentMeta";
import Element from "./Element";
import DragLayer from "./DragLayer";
import { useDrop } from "react-dnd";
import { deepCopy } from "../../helpers/generics";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../../customHooks/useLocalStorage";

const DraggableList = styled.ul`
  padding: 1rem;
  list-style: none;
  & li {
    padding: 0.5rem;
    border-radius: 0.3rem;
    border: 1px solid #d3d3d3;
    color: #333;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition all ease-in 0.1s;
    &:hover {
      box-shadow: 0px 0px 4px #f2f2f2;
      background: #007BFF;
      color:white;
    }
  }
`;

const PageContainer = styled.div`
  position: relative;
  height: 86vh;
  padding: 0.5rem;
  overflow-y: scroll;
  border: 2px dashed #ccc;
  border-radius: 0.3rem;
  background: ${(props) => (props.isOverCurrent ? "#f2f2f2" : "initial")};
`;

const PageBuilder = () => {
  const [localData, setLocalData] = useLocalStorage("pageData", {});
  const [pageData, setPageData] = useState({ ...localData });

  useEffect(() => {
    setLocalData({ ...pageData });
  }, [pageData]);

  const [{ isOverCurrent }, drop] = useDrop({
    accept: ["formElement", "htmlElement", "textElement"],
    drop(item, monitor) {
      let ele = deepCopy(item);
      let delta = monitor.getClientOffset();
      let initialOffset = monitor.getInitialSourceClientOffset();
      let finalPos = { left: delta.x - initialOffset.x, top: delta.y - initialOffset.y };

      console.table({
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        pointerOffset: monitor.getClientOffset(),
      });

      console.log(ele, ele.id, "test");
      //if element lready exists
      if (ele.id === undefined) {
        ele.id = uuidv4();
      } else {
        ele.attributes.styleObj = {
          position: "absolute",
          ...finalPos,
        };
      }

      setPageData({ ...pageData, [ele.id]: ele });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  const renderEle = (ele) => {
    console.log(ele, "test");
    let Component = require(`../FormComponents/${ele.path}`).default;
    return <Component editMode={true} {...ele} />;
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 border bg-white shadow-sm" style={{ height: "90vh" }}>
            <DraggableList>
              {componentsMeta.map((c, idx) => {
                return <Element data={c} key={`Ele${idx}`} />;
              })}
            </DraggableList>
          </div>
          <div className="col-10 border p-1">
            <div className="d-flex justify-content-end">
              <div className="mr-2">
                <small className="text-muted">
                  <em>* Changes will be autosaved</em>
                </small>
              </div>
              <div
                className="pointer mr-4"
                onClick={() => {
                  setPageData({});
                }}
              >
                <i className="fa fa-trash mr-1"></i> Clear
              </div>
            </div>
            <PageContainer ref={drop} isOverCurrent={isOverCurrent}>
              <DragLayer />
              {Object.keys(pageData).length > 0 &&
                Object.values(pageData).map((ele) => {
                  return renderEle(ele);
                })}
            </PageContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBuilder;
