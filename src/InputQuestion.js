import React, { useState } from "react";
import Answer from "./Answer";
import { Container, Text } from '@nextui-org/react';

const InputQuestion = ({ id, text, answeredCallback }) => {
    const [answers, setAnswers] = useState(Array(4).fill(""));

    return (
        <Container>
            <Text id={id}>{text}</Text>
            {answers.map((el, i) =>
                <Answer key={`${id}[${i + 1}]`}
                        num={i + 1}
                        onChangeCallback={
                            (evt) => {
                                answers[i] = evt.target.value;
                                setAnswers(answers);
                                if (answers.every(Boolean)) {
                                    answeredCallback(answers);
                                } else {
                                    answeredCallback(null);
                                }
                            }
                        }
                        id={id}/>
            )}
        </Container>
    );
};

export default InputQuestion;
