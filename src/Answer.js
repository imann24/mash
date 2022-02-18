import React, { useState, useEffect } from "react";
import { Container, Input } from '@nextui-org/react';

const Answer = ({ num, id, onChangeCallback }) => {
    // TESTING: uncomment out to test prefilled values
    // const fladdle = (Math.random() + 1).toString(36).substring(7);
    // const [testVal, setTestVal] = useState("");
    //
    // useEffect(() => {
    //     setTestVal(fladdle);
    //     onChangeCallback({target: {value: fladdle}});
    // }, []);

    return(
        <Container>
            <Input name={`${id}[]`}
                   className="answer"
                   labelLeft={`${num}.`}
                   // TESTING: uncomment out to test prefilled values
                   // initialValue={testVal}
                   onChange={onChangeCallback}/>
        </Container>
    );
};

export default Answer;
