import React from "react";

interface inputTypes {
    value : string,
    info : string
}
const Label : React.FC<inputTypes> = ({info , value}) =>{
  return <label htmlFor={info}>{value}</label>;
}

export default Label;
