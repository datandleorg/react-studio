import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

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
      style={{ opacity: isDragging ? "0" : "1", ...attributes.styleObj }}
    >
      {attributes.value}
    </button>
  );
};

export default Button;
