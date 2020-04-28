import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const Select = ({ editMode, id, attributes, ...data }) => {
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
        class="form-group"
        ref={drag}
        class="form-group bg-white shadow-sm p-2 border pointer"
        style={{ width: "20rem", opacity: isDragging ? "0" : "1", ...attributes.styleObj }}
      >
        <label for="">{attributes.label}</label>
        <select class="form-control" name="" id="">
          {attributes.options.map((o) => {
            return <option value={o.value}>{o.label}</option>;
          })}
        </select>
      </div>
    </>
  );
};

export default Select;
