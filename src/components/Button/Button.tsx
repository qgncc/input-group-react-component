import "./Button.scss";

type HTMLButtonAttrs = JSX.IntrinsicElements["button"];
export interface IButtonProps extends HTMLButtonAttrs {
  submit?: boolean;
  disabled?: boolean;
}

export function Button({
  className,
  submit,
  disabled,
  children,
  ...rest
}: IButtonProps) {
  className = className ? " " + className : "";
  className += submit ? " button--submit" : "";
  className += disabled ? " button--disabled" : "";
  return (
    <button
      disabled={disabled}
      type={submit ? "submit" : "button"}
      className={"button" + className}
      {...rest}
    >
      {children}
    </button>
  );
}
