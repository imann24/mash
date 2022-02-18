import React, { useState } from "react";
import Answer from "./Answer";
import { Container, Text } from '@nextui-org/react';
import MashOption from "./MashOption";

const InputQuestion = ({ id, text, answeredCallback }) => {
    const [answers, setAnswers] = useState(Array.from({length: 4}, () => new MashOption("", id)));

    return (
        <Container>
            <Text id={id}>{text}</Text>
            {answers.map((el, i) =>
                <Answer key={`${id}[${i + 1}]`}
                        num={i + 1}
                        onChangeCallback={
                            (evt) => {
                                answers[i] = new MashOption(evt.target.value, answers[i].type);
                                setAnswers(answers);
                                answeredCallback(answers);
                            }
                        }
                        id={id}/>
            )}
        </Container>
    );
};

export default InputQuestion;
