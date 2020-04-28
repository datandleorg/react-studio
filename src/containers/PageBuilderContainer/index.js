import React from "react";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { withRouter } from "react-router-dom";
import PageBuilder from "../../components/PageBuilder";

const PageBuilderContainer = (props) => {
  return (
    <DndProvider backend={Backend}>
      <PageBuilder {...props} />
    </DndProvider>
  );
};

export default withRouter(PageBuilderContainer);
