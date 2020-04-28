import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import styled from "styled-components";

const TextEle = styled.h1`
  color: #333;
`;

const Text = ({ editMode, id, attributes, ...data }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { id, attributes, ...data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <>
      <TextEle
        as={attributes.tag}
        ref={drag}
        style={{ width: "20rem", opacity: isDragging ? "0" : "1", ...attributes.styleObj }}
      >
        {attributes.value}
      </TextEle>
    </>
  );
};

export default Text;
