import React from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { withRouter } from "react-router-dom";
import PageBuilder from "../../components/PageBuilder";
import TouchBackend from "react-dnd-touch-backend";
const isTouchDevice = !!("ontouchstart" in window || navigator.maxTouchPoints);

const PageBuilderContainer = (props) => {
  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      {/* This is {!isTouchDevice && "not "}a touch-supporting browser */}
      <PageBuilder {...props} />
    </DndProvider>
  );
};

export default withRouter(PageBuilderContainer);
