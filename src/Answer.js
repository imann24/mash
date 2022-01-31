import React from "react";
import { Container, Input } from '@nextui-org/react';

const Answer = ({ num, id }) =>
    <Container>
        <Input name={`${id}[]`} className="answer" labelLeft={`${num}.`}/>
    </Container>
;

export default Answer;
