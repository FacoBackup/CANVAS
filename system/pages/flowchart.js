import Flowchart from "../components/flowchart/modules/Flowchart";
import Engine from "../packages/engine/Engine";
// import LinkIndicator from "../components/flowchart/modules/link/LinkIndicator";
import FlowchartContent from "../components/flowchart/modules/FlowchartContent";
// import RenderLinks from "../components/flowchart/modules/RenderLinks";
import React from "react";
import 'typeface-roboto'

export default function flowchart() {
    return (
        <Flowchart>
            {props => (
                <Engine {...props}>
                    <FlowchartContent {...props}/>
                </Engine>
            )}
        </Flowchart>
    )
}