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
        const allOptions = [housing, kidCount, spouses.current, cars.current];
        const allAnswers = [...housing, ...kidCount, ...spouses.current, ...cars.current];
        const chosenHouse = {}, chosenKidCount = {}, chosenSpouse = {}, chosenCar = {};
        const choices = [chosenHouse, chosenKidCount, chosenSpouse, chosenCar];
        let pointer = -1;
        let counter = 0;
        let breaker = 0;
        while (breaker < 100000 && (!chosenHouse.value || !chosenKidCount.value || !chosenSpouse.value || !chosenCar.value)) {
            breaker++;
            pointer++;
            if (pointer === allAnswers.length) {
                pointer = 0;
            }
            if (allAnswers[pointer].crossedOut || allAnswers[pointer].chosen) {
                continue;
            }

            if (counter == crossOutCount) {
                let optionIndex = Math.round(pointer / allOptions.length);
                const current = allAnswers[pointer];
                if (optionIndex === allOptions.length) {
                    optionIndex--;
                }
                const option = allOptions[optionIndex];
                let candidates = option.filter((v) => !v.crossedOut);
                allAnswers[pointer].crossedOut = true;
                let cBefore = [...candidates];
                if (candidates.length === 2 && candidates.includes(current)) {
                    candidates = candidates.filter((c) => c !== current);
                }
                if (candidates.length === 1) {
                    choices[optionIndex].value = candidates[0].value;
                    candidates[0].chosen = true;
                    candidates[0].crossedOut = false;
                }
                // offset for the increment by 1
                counter = -1;
            }

            counter++;
        }
        console.log(choices);
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
