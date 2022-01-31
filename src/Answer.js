import React from "react";
import { Container, Input } from '@nextui-org/react';

const Answer = ({ num, id, onChangeCallback }) => {
    return(
        <Container>
            <Input name={`${id}[]`} className="answer" labelLeft={`${num}.`} onChange={onChangeCallback}/>
        </Container>
    );
};

export default Answer;
