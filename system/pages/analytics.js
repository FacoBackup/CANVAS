import Engine from "../packages/engine/Engine";
import React from "react";
import 'typeface-roboto'
import Analytics from "../components/analytics/modules/Analytics";
import AnalyticsContent from "../components/analytics/templates/AnalyticsContent";

export default function analytics() {
    return (
        <Analytics>
            {props => (
                <Engine {...props}>
                    <AnalyticsContent {...props}/>
                </Engine>
            )}
        </Analytics>
    )
}