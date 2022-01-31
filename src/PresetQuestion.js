import React from "react";
import { Container, Text, Button } from '@nextui-org/react';

const PresetQuestion = ({ id, question, options }) =>
    <Container>
        <Text>{question}</Text>
        <Button.Group>
            {options.map((opt) =>
                <Button key={opt}>{opt}</Button>
            )}
        </Button.Group>
    </Container>
;

export default PresetQuestion;
