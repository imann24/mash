import React from "react";
import Answer from "./Answer";
import { Container, Text } from '@nextui-org/react';

const InputQuestion = ({ id, text }) =>
    <Container>
        <Text id={id}>{text}</Text>
        {Array(4).fill().map((el, i) =>
            <Answer key={`${id}[${i + 1}]`} num={i + 1} id={id}/>
        )}
    </Container>
;

export default InputQuestion;
