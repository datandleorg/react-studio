import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const Element = (props) => {
  const [{}, drag, preview] = useDrag({
    item: { ...props.data },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <li ref={drag}>
      <div className="d-flex align-items-center justify-content-around">
        <div>
          <i className={props.data.icon}></i>
        </div>
        <div>{props.data.name}</div>
      </div>
    </li>
  );
};

export default Element;
