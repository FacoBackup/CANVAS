import Engine from "../packages/engine/Engine";
import React from "react";
import 'typeface-roboto'
import Analytics from "../components/analytics/modules/Analytics";
import Charts from "../components/analytics/templates/Charts";

export default function analytics() {
    return (
        <Analytics>
            {props => (
                <Engine {...props}>
                    <Charts {...props}/>
                </Engine>
            )}
        </Analytics>
    )
}