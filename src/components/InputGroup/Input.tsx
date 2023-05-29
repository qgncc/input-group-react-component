import { FieldType } from "../InputGroup/InputGroup";
import "./Input.scss";

const customTypesToHTMLTypes = {
  inputText: "text",
  inputEmail: "email",
  inputPassword: "password",
};
type HTMLInputAttrs = JSX.IntrinsicElements["input"];
type HTMLLabelAttrs = JSX.IntrinsicElements["label"];

interface IInputProps extends HTMLInputAttrs {
  type: FieldType;
  required?: boolean;
  label?: string;
  labelProps?: HTMLLabelAttrs;
}

export function Input({
  type,
  label,
  labelProps,
  required,
  className,
  ...rest
}: IInputProps) {
  return (
    <label {...labelProps}>
      {label}
      <input
        placeholder="Enter value"
        className={"input" + (className ? " " + className : "")}
        type={customTypesToHTMLTypes[type]}
        {...rest}
      />
    </label>
  );
}
