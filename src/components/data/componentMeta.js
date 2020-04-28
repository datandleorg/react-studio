export const componentsMeta = [
  {
    name: "Input",
    componentType: "InputComponent",
    type: "formElement",
    path: "Input",
    icon: "fa fa-i-cursor",
    attributes: {
      name: "",
      label: "Input",
      value: "",
      placeholder: "",
      styleObj: {
        position: "static",
      },
    },
    dragOffset: { x: 150, y: 50 },
    componentProps: {
      className: "",
    },
  },
  {
    name: "Select",
    componentType: "SelectComponent",
    type: "formElement",
    path: "Select",
    icon: "fa fa-th-list",
    attributes: {
      name: "",
      label: "Select",
      value: "",
      placeholder: "",
      options: [
        { label: "one", value: "one" },
        { label: "two", value: "two" },
      ],
      styleObj: {
        position: "static",
      },
    },
    componentProps: {
      className: "",
    },
  },
  {
    name: "TextArea",
    componentType: "TextAreaComponent",
    type: "formElement",
    path: "TextArea",
    icon: "fa fa-text-width",
    attributes: {
      name: "",
      label: "TextArea",
      value: "",
      placeholder: "",
      styleObj: {
        position: "static",
      },
    },
    componentProps: {
      className: "",
    },
  },
  {
    name: "Paragraph",
    componentType: "TextComponent",
    type: "textElement",
    path: "Text",
    icon: "fa fa-font",
    attributes: {
      value: "Sample Text",
      tag: "p",
      styleObj: {
        position: "static",
      },
    },
    componentProps: {
      className: "",
    },
  },
  {
    name: "Heading",
    componentType: "TextComponent",
    type: "textElement",
    path: "Text",
    icon: "fa fa-font",
    attributes: {
      value: "Sample Text",
      tag: "h2",
      styleObj: {
        position: "static",
      },
    },
    componentProps: {
      className: "",
    },
  },
  {
    name: "Button",
    componentType: "ButtonComponent",
    type: "htmlElement",
    path: "Button",
    icon: "fa fa-square",
    attributes: {
      value: "Button",
      styleObj: {
        position: "static",
      },
    },
    dragOffset: { x: 50, y: 10 },
    componentProps: {
      className: "",
    },
  },
];
