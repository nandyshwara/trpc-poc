import { Field } from "formik";
import React from "react";
import Label from "./Label";

interface inputTypeProps {
  name: string;
  id?: string;
  className?: string;
  placeholder?: string;
  inputType?: string;
  options?: string[];
}

const TextInput: React.FC<inputTypeProps> = ({
  name,
  id,
  className,
  placeholder,
  inputType,
  options,
}) => {
    console.log(options)
  return (
    <div className="my-5 flex flex-col">
      <Label info={name} value={name} />
      {inputType === "select" ? (
        <Field as="select" name={name}>
          {options && options.map((currEle : string) => {
            return <option value={currEle}>{currEle}</option>;
          })}
        </Field>
      ) : (
        <Field
          className={className}
          id={id}
          name={name}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default TextInput;
