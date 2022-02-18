import React, { useState, useEffect, useRef } from "react";
import { Container, createTheme, NextUIProvider } from "@nextui-org/react"

import PresetQuestion from "./PresetQuestion";
import InputQuestion from "./InputQuestion";
import SpiralModal from "./SpiralModal";
import MashOption from "./MashOption";
import CrossOutList from "./CrossOutList";

const darkTheme = createTheme({
    type: "dark"
});

const crossOutDelayMs = 250;

const App = () => {
    const housingKey = "housing";
    const spouseKey = "spouse";
    const kidsKey = "kids";
    const carKey = "car"

    const [_, update] = useState(null);
    const [housing, setHousing] = useState(["Mansion", "Apartment", "Shack", "House"].map(
        (v) => new MashOption(v, housingKey)
    ));
    const [kidCount, setKidCount] = useState([1, 2, 3, 4].map(
        (v) => new MashOption(v, kidsKey)
    ));
    const spouses = useRef(Array.from({length: 4}, () => new MashOption("", spouseKey)))
    const cars = useRef(Array.from({length: 4}, () => new MashOption("", carKey)));
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [shouldShowList, setShowList] = useState(false);

    const crossOut = (crossOutCount) => {
        setShowList(true);
        console.log("Cross out every", crossOutCount);
        const allAnswers = [...housing, ...kidCount, ...spouses.current, ...cars.current];
        const choices = {};
        setTimeout(() => {
            crossOutStep(crossOutCount, allAnswers, choices)
        }, crossOutDelayMs);
    };

    const crossOutStep = (crossOutCount, remainingAnswers, choices) => {
        let counter = 0;
        while (Object.keys(choices).length < 4 && remainingAnswers.length) {
            const ans = remainingAnswers.shift();
            if (counter === crossOutCount) {
                ans.crossedOut = true;
                const remaining = remainingAnswers.filter((c) => c.type === ans.type);
                if (remaining.length === 1) {
                    const selected = remaining[0];
                    selected.chosen = true;
                    choices[selected.type] = selected;
                    remainingAnswers.splice(remainingAnswers.indexOf(selected), 1);
                }
                counter = 0;
                update({});
                setTimeout(() => {
                    crossOutStep(crossOutCount, remainingAnswers, choices)
                }, crossOutDelayMs);
                break;
            } else {
                remainingAnswers.push(ans);
            }
            counter++;
        }
    };

    useEffect(() => {
        const spousesSet = Boolean(spouses.current) && spouses.current.filter((s) => !s.value).length === 0;
        const carsSet = Boolean(cars.current) && cars.current.filter((c) => !c.value).length === 0;
        setButtonEnabled(spousesSet && carsSet);
    });

    return(
        <NextUIProvider theme={darkTheme}>
            <Container>
                <PresetQuestion id={housingKey}
                                question="Where will you live?"
                                options={housing}/>
                <PresetQuestion id={kidsKey}
                                question="How many kids will you have?"
                                options={kidCount}/>
                <InputQuestion id={spouseKey}
                               answeredCallback={
                                   (answers) => {
                                       spouses.current = [...answers];
                                       update({});
                                   }
                               }
                               text="Who will you marry?"/>
                <InputQuestion id={carKey}
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
            <CrossOutList listGroups={{[housingKey]: housing,
                                       [kidsKey]: kidCount,
                                       [spouseKey]: spouses.current,
                                       [carKey]: cars.current}}
                          shouldShowList={shouldShowList}/>
        </NextUIProvider>
    );
}

export default App;
