import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { getStyles } from "../dragStyles";

const Button = ({ editMode, id, attributes, ...data }) => {
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
    <button
      ref={drag}
      type="button"
      class="btn btn-primary"
      {...(editMode
        ? {
            style: {
              width: "10rem",
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
              width: "10rem",
            },
          })}
    >
      {attributes.value}
    </button>
  );
};

export default Button;
