import Flowchart from "../components/modules/renderers/Flowchart";
import Engine from "../components/modules/engine/Engine";
import LinkIndicator from "../components/templates/flowchart/link/LinkIndicator";
import FlowchartNodes from "../components/templates/flowchart/renderers/FlowchartNodes";
import RenderLinks from "../components/templates/flowchart/renderers/RenderLinks";
import React from "react";

export default function flowchart() {
    return (


     <Flowchart>
         {props => (
             <Engine {...props} offsetTop={75}>
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