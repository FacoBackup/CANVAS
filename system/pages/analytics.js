import Engine from "../components/modules/engine/Engine";
import React from "react";
import 'typeface-roboto'
import Analytics from "../components/modules/renderers/Analytics";
import Charts from "../components/templates/analytics/renderers/Charts";

export default function analytics() {
    return (
        <Analytics>
            {props => (
                <Engine {...props} offsetTop={35}>
                    <Charts {...props}/>
                </Engine>
            )}
        </Analytics>
    )
}