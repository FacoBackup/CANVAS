import React, {useMemo} from "react";
import HorizontalChart from "../../../chart/horizontal/HorizontalChart";
import PieChart from "../../../chart/pie/PieChart";
import LineChart from "../../../chart/line/LineChart";
import PropTypes from 'prop-types'

export default function ChartNode(props) {

    const getChart = useMemo(() => {
        let res
        const p = {
            value: {
                label: props.node.dataset?.valueLabel,
                field: props.node.dataset?.value
            },
            axis: {
                label: props.node.dataset?.axisLabel,
                field: props.node.dataset?.axis
            },
            width: props.node.dimensions.width,
            height: props.node.dimensions.height,
            title: props.node.title,
            data: props.dataset,
            color: props.node.styling.color,

        }
        switch (props.node.variant) {

            case 'bar-vertical': {
                res = <HorizontalChart {...p}/>
                break
            }
            case 'bar-horizontal': {
                res = <HorizontalChart {...p}/>
                break
            }
            case 'pie': {
                res = <PieChart {...p}/>
                break
            }
            case 'line': {
                res = <LineChart {...p}/>
                break
            }
            default:
                break
        }
        return res
    }, [props.node.title, props.node.dataset, props.node.variant, props.node.dimensions, props.node.styling.color])


    return (
        <foreignObject
            x={0} y={0}
            overflow={'hidden'} id={`${props.node.id}-node-foreign-object`}
            width={props.node.dimensions.width} height={props.node.dimensions.height}
        >
            {getChart}
        </foreignObject>
    )

}

ChartNode.propTypes = {
    node: PropTypes.object,
    dataset: PropTypes.array
}