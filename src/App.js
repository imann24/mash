import React, { useState, useEffect, useRef } from "react";
import { Container, createTheme, NextUIProvider } from "@nextui-org/react"

import PresetQuestion from "./PresetQuestion";
import InputQuestion from "./InputQuestion";
import SpiralModal from "./SpiralModal";
import MashOption from "./MashOption";

const darkTheme = createTheme({
    type: "dark"
});

const App = () => {
    const [_, update] = useState(null);
    const [housing, setHousing] = useState(["Mansion", "Apartment", "Shack", "House"].map(
        (v) => new MashOption(v)
    ));
    const [kidCount, setKidCount] = useState([1, 2, 3, 4].map(
        (v) => new MashOption(v)
    ));
    const spouses = useRef(Array.from({length: 4}, () => new MashOption("")))
    const cars = useRef(Array.from({length: 4}, () => new MashOption("")));
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const crossOut = (crossOutCount) => {
        console.log("Cross out every", crossOutCount);
        const allAnswers = [...housing, ...kidCount, ...spouses.current, ...cars.current];
        console.log(allAnswers);
    };

    useEffect(() => {
        const spousesSet = Boolean(spouses.current) && spouses.current.filter((s) => !s.value).length === 0;
        const carsSet = Boolean(cars.current) && cars.current.filter((c) => !c.value).length === 0;
        setButtonEnabled(spousesSet && carsSet);
    });

    return(
        <NextUIProvider theme={darkTheme}>
            <Container>
                <PresetQuestion id="housing"
                                question="Where will you live?"
                                options={housing}/>
                <PresetQuestion id="children"
                                question="How many kids will you have?"
                                options={kidCount}/>
                <InputQuestion id="spouse"
                               answeredCallback={
                                   (answers) => {
                                       spouses.current = [...answers];
                                       update({});
                                   }
                               }
                               text="Who will you marry?"/>
                <InputQuestion id="car"
                               answeredCallback={
                                    (answers) => {
                                        cars.current = [...answers];
                                        update({});
                                    }
                               }
                               text="What type of car will you drive?"/>
            </Container>
            <SpiralModal id="spiralCount" countCallback={(count) => {
                crossOut(count)
            }} buttonEnabled={buttonEnabled}/>
        </NextUIProvider>
    );
}

export default App;
