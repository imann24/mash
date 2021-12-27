import React from "react";

import Question from "./question";

const App = ({ title }) =>
    <div>{title}
        <Question id="spouse" text="Who will you marry?"/>
    </div>
;

export default App;
