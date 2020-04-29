import React, { useState, useEffect, useReducer, useRef } from "react";
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
  overflow-y: scroll;
  padding: 0.5rem;
  border: 2px dashed #ccc;
  border-radius: 0.3rem;
  background: ${(props) => (props.isOverCurrent ? "#f2f2f2" : "initial")};
`;

const PageBuilder = () => {
  //using localStorage as persistent data
  const [localData, setLocalData] = useLocalStorage("pageData", {});
  const [pageData, setPageData] = useState({ ...localData });

  useEffect(() => {
    //update local storage whenever there is a change in html
    setLocalData({ ...pageData });
  }, [pageData]);

  const dropTargetRef = useRef();

  const [{ isOverCurrent }, drop] = useDrop({
    accept: ["formElement", "htmlElement", "textElement"],
    drop(item, monitor) {
      let ele = deepCopy(item);
      let delta = monitor.getDifferenceFromInitialOffset();
      let left = Math.round(
        (ele.attributes.styleObj.left ? ele.attributes.styleObj.left : 0) + delta.x
      );
      let top = Math.round(
        (ele.attributes.styleObj.top ? ele.attributes.styleObj.top : 0) + delta.y
      );

      //if element is new
      if (ele.id === undefined) {
        ele.id = uuidv4();
      } else {
        //if element already exists
        ele.attributes.styleObj = {
          position: "absolute",
          left,
          top,
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

  const removeComponent = (id) => {
    let pageDataCopy = deepCopy(pageData);
    delete pageDataCopy[id];
    setPageData(pageDataCopy);
  };

  const renderEle = (ele, index) => {
    let Component = require(`../FormComponents/${ele.path}`).default;
    return (
      <Component
        removeComponent={(id) => {
          removeComponent(id);
        }}
        index={index}
        editMode={true}
        {...ele}
      />
    );
  };

  drop(dropTargetRef);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 border bg-white shadow-sm">
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
            <PageContainer ref={dropTargetRef} isOverCurrent={isOverCurrent}>
              <DragLayer />
              {Object.keys(pageData).length > 0 &&
                Object.values(pageData).map((ele, eidx) => {
                  return renderEle(ele, eidx);
                })}
            </PageContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBuilder;
