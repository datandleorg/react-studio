// import React from "react";
// import { useDragLayer } from "react-dnd";
// import Input from "../FormComponents/Input";
// import Button from "../FormComponents/Button";
// import Select from "../FormComponents/Select";
// import TextArea from "../FormComponents/TextArea";
// import Text from "../FormComponents/Text";

// const layerStyles = {
//   position: "fixed",
//   pointerEvents: "none",
//   zIndex: 100,
//   left: 0,
//   top: 0,
//   width: "auto",
//   height: "100%",
// };

// function getItemStyles(props, initialOffset, currentOffset, pointerOffset, item) {
//   if (!initialOffset || !currentOffset) {
//     return {
//       display: "none",
//     };
//   }
//   let { x, y } = pointerOffset;
//   const transform = `translate(${x}px, ${y}px)`;

//   return {
//     transform,
//     WebkitTransform: transform,
//     boxShadow: "0px 0px 5px #ccc",
//     background: "#FFFFFF",
//   };
// }

// const DragLayer = (props) => {
//   const { itemType, isDragging, item, initialOffset, currentOffset, pointerOffset } = useDragLayer(
//     (monitor) => ({
//       item: monitor.getItem(),
//       itemType: monitor.getItemType(),
//       initialOffset: monitor.getInitialSourceClientOffset(),
//       currentOffset: monitor.getSourceClientOffset(),
//       isDragging: monitor.isDragging(),
//       pointerOffset: monitor.getClientOffset(),
//     })
//   );

//   return (
//     <div style={layerStyles}>
//       <div style={getItemStyles(props, initialOffset, currentOffset, pointerOffset, item)}>
//         {item && item.path === "Input" && <Input editMode={false} {...item} />}
//         {item && item.path === "Button" && <Button editMode={false} {...item} />}
//         {item && item.path === "Select" && <Select editMode={false} {...item} />}
//         {item && item.path === "TextArea" && <TextArea editMode={false} {...item} />}
//         {item && item.path === "Text" && <Text editMode={false} {...item} />}
//       </div>
//     </div>
//   );
// };

// export default DragLayer;
import React from "react";
import { useDragLayer } from "react-dnd";
import Input from "../FormComponents/Input";
import Button from "../FormComponents/Button";
import Select from "../FormComponents/Select";
import TextArea from "../FormComponents/TextArea";
import Text from "../FormComponents/Text";

import snapToGrid from "./snapToGrid";
const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};
function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;
  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}
const DragLayer = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));
  function renderItem() {
    switch (item.name) {
      case "Input":
        return <Input editMode={false} {...item} />;
      case "Select":
        return <Select editMode={false} {...item} />;
      case "TextArea":
        return <TextArea editMode={false} {...item} />;
      case "Paragraph":
        return <Text editMode={false} {...item} />;
      case "Heading":
        return <Text editMode={false} {...item} />;
      case "Button":
        return <Button editMode={false} {...item} />;
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}>
        {renderItem()}
      </div>
    </div>
  );
};
export default DragLayer;
