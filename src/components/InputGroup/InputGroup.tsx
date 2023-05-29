import "./InputGroup.scss";
import { useCallback } from "react";
import { Input } from ".";
import { InputGroupController } from ".";
export type FieldType = "inputText" | "inputEmail" | "inputPassword";
export type Field = {
  id: string;
  type: FieldType;
  label: string;
  defaultValue?: string;
  required?: true;
};

type ChangeHandler = (id: string, newValue: string) => void;

export interface IInputGroupProps {
  controller: InputGroupController;
  onChange: ChangeHandler;
}

function collectProps(id: string, controller: InputGroupController) {
  let required = controller.isRequiredById(id);
  let label = controller.getLabelById(id) || "";
  let type = controller.getTypeById(id);
  let value = controller.values[id];
  let key = id;
  if (!type) throw new Error("Input should have type");
  return { value, required, type, label, id, key };
}

export function InputGroup({ controller, onChange }: IInputGroupProps) {
  let inputElements = [];

  let changeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let { id, value } = event.target;
      controller.setValue(id, value);
      onChange(id, value);
    },
    [controller, onChange]
  );

  for (let id in controller.values) {
    inputElements.push(
      <Input
        labelProps={{
          className: "inputGroup__label",
        }}
        onChange={changeHandler}
        {...collectProps(id, controller)}
      />
    );
  }
  return <>{inputElements}</>;
}
