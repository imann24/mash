import React, {useState, useEffect} from "react";
import { Container, createTheme, NextUIProvider } from "@nextui-org/react"

import PresetQuestion from "./PresetQuestion";
import InputQuestion from "./InputQuestion";
import SpiralModal from "./SpiralModal";

const darkTheme = createTheme({
    type: "dark"
});

const crossOut = (crossOutCount) => {
    console.log("Cross out every", crossOutCount);
};

const App = () => {
    const [spouses, setSpouses] = useState(null);
    const [cars, setCars] = useState(null);
    const [buttonEnabled, setButtonEnabled] = useState(false);

    useEffect(() => {
        setButtonEnabled(spouses && cars);
    });

    return(
        <NextUIProvider theme={darkTheme}>
            <Container>
                <PresetQuestion id="housing"
                                question="Where will you live?"
                                options={["Mansion", "Apartment", "Shack", "House"]}/>
                <PresetQuestion id="children"
                                question="How many kids will you have?"
                                options={[1, 2, 3, 4]}/>
                <InputQuestion id="spouse"
                               answeredCallback={
                                   (answers) => {
                                       setSpouses(answers);
                                   }
                               }
                               text="Who will you marry?"/>
                <InputQuestion id="car"
                               answeredCallback={
                                    (answers) => {
                                        setCars(answers);
                                    }
                               }
                               text="What type of car will you drive?"/>
            </Container>
            <SpiralModal id="spiralCount" countCallback={crossOut} buttonEnabled={buttonEnabled}/>
        </NextUIProvider>
    );
}

export default App;
