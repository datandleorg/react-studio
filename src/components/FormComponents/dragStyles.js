export const getStyles = (left, top, isDragging, position) => {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: position,
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
  };
};
