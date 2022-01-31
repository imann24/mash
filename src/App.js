import React from "react";
import { Container, createTheme, NextUIProvider } from "@nextui-org/react"

import PresetQuestion from "./PresetQuestion";
import InputQuestion from "./InputQuestion";
import SpiralModal from "./SpiralModal";

const darkTheme = createTheme({
    type: "dark"
});

const App = () =>
    <NextUIProvider theme={darkTheme}>
        <Container>
            <PresetQuestion id="housing"
                            question="Where will you live?"
                            options={["Mansion", "Apartment", "Shack", "House"]}/>
            <PresetQuestion id="children"
                            question="How many kids will you have?"
                            options={[1, 2, 3, 4]}/>
            <InputQuestion id="spouse" text="Who will you marry?"/>
            <InputQuestion id="car" text="What type of car will you drive?"/>
        </Container>
        <SpiralModal id="spiralCount"/>
    </NextUIProvider>
;

export default App;
