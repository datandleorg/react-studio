import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const Input = ({ editMode, id, attributes, ...data }) => {
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
      <div
        ref={drag}
        class="form-group bg-white shadow-sm p-2 border pointer"
        style={{ width: "20rem", opacity: isDragging ? "0" : "1", ...attributes.styleObj }}
      >
        <label for="">{attributes.label}</label>
        <input
          type="text"
          class="form-control"
          name=""
          id={id}
          aria-describedby="helpId"
          placeholder={attributes.placeholder}
        />
      </div>
    </>
  );
};

export default Input;
