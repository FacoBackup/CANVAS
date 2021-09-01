import Flowchart from "../components/modules/renderers/Flowchart";
import Engine from "../components/modules/engine/Engine";
import LinkIndicator from "../components/templates/flowchart/link/LinkIndicator";
import FlowchartNodes from "../components/templates/renderers/FlowchartNodes";
import RenderLinks from "../components/templates/renderers/RenderLinks";
import React from "react";
import Head from "next/head";

export default function flowchart() {
    return (


     <Flowchart>
         {props => (
             <Engine {...props}>
                 <LinkIndicator source={props.toBeLinked}/>
                 <FlowchartNodes {...props}/>
                 <RenderLinks
                     {...props}
                 />
             </Engine>
         )}
     </Flowchart>
    )
}