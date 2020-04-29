import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { getStyles } from "../dragStyles";

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
