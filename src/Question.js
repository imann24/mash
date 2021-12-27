import React from "react";

const Question = ({ id, text }) =>
    <div>
        <label htmlFor={id}>{text}</label>
        <input name={id} id={id}/>
    </div>
;

export default Question;
