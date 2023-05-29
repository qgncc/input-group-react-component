import { useState } from "react";
import { Field } from "./InputGroup";
type FieldWithValue = Field & { value: string };
type Config = FieldWithValue[];
export type InputGroupController = ReturnType<typeof useInputGroup>;
export function useInputGroup(fields: Field[]) {
  for (const field of fields as Config) {
    field.value = field.defaultValue || "";
  }
  let [config, setConfig] = useState(fields as Config);

  return {
    get values() {
      let values: { [id: string]: string } = {};
      for (const field of config) {
        values[field.id] = field.value;
      }
      return values;
    },
    setValue(id: string, value: string) {
      setConfig((config) => {
        let field = config.find((field) => field.id === id);
        if (!field) return config;
        field.value = value;
        return [...config];
      });
    },
    isFieldsValid() {
      let flag = true;
      for (const field of config) {
        flag = this.isFieldValid(field);
        if (!flag) return false;
      }
      return flag;
    },
    isFieldValid(fieldOrId: FieldWithValue | string) {
      let field: FieldWithValue | null;
      if (typeof fieldOrId === "string") {
        field = config.find((f) => f.id === fieldOrId) || null;
      } else {
        field = fieldOrId;
      }
      if (!field) throw new Error("No field with such id " + fieldOrId);
      if (field.required && field.value.length === 0) return false;
      if (field.type === "inputEmail") {
        return /.+@.+/.test(field.value);
      }
      return true;
    },
    fieldsValidityStatus() {
      let status: { [id: string]: boolean } = {};
      for (const field of config) {
        status[field.id] = this.isFieldValid(field);
      }
    },
    isRequiredById(id: string) {
      return config.find((field) => field.id === id)?.required || false;
    },
    getLabelById(id: string) {
      return config.find((field) => field.id === id)?.label || null;
    },
    getTypeById(id: string) {
      return config.find((field) => field.id === id)?.type || null;
    },
  };
}
