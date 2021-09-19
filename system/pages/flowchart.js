import Flowchart from "../components/flowchart/modules/Flowchart";
import Engine from "../packages/engine/Engine";
// import LinkIndicator from "../components/flowchart/modules/link/LinkIndicator";
import FlowchartNodes from "../components/flowchart/modules/FlowchartNodes";
// import RenderLinks from "../components/flowchart/modules/RenderLinks";
import React from "react";
import 'typeface-roboto'

export default function flowchart() {
    return (
        <Flowchart>
            {props => (
                <Engine {...props}>
                    {/*<LinkIndicator source={props.toBeLinked}/>*/}
                    <FlowchartNodes {...props}/>
                    {/*<RenderLinks*/}
                    {/*    {...props}*/}
                    {/*/>*/}
                </Engine>
            )}
        </Flowchart>
    )
}