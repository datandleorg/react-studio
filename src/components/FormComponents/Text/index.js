import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import styled from "styled-components";
import { getStyles } from "../dragStyles";

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
        {...(editMode
          ? {
              style: {
                width: "20rem",
                ...getStyles(
                  attributes.styleObj.left ? attributes.styleObj.left : 0,
                  attributes.styleObj.top ? attributes.styleObj.top : 0,
                  isDragging,
                  attributes.styleObj.position
                ),
              },
            }
          : {
              style: {
                width: "20rem",
              },
            })}
      >
        {attributes.value}
      </TextEle>
    </>
  );
};

export default Text;
