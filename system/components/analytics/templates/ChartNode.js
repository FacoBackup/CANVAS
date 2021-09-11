import React, {useEffect, useState} from "react";
import HorizontalChart from "../../../chart/horizontal/HorizontalChart";
import PieChart from "../../../chart/pie/PieChart";
import LineChart from "../../../chart/line/LineChart";
import PropTypes from 'prop-types'

export default function ChartNode(props) {
    const [mounted, setMounted] = useState(false)
    const getChart = (props, type) => {
        let res
        console.log("RUNNING AGAIN")
        switch (type) {

            case 'bar-vertical': {
                res = <HorizontalChart {...props}/>
                break
            }
            case 'bar-horizontal': {
                res = <HorizontalChart {...props}/>
                break
            }
            case 'pie': {
                res = <PieChart {...props}/>
                break
            }
            case 'line': {
                res = <LineChart {...props}/>
                break
            }
            default:
                break
        }
        return res
    }


    useEffect(() => {
        console.log("THIS IS MOUnTED " + JSON.stringify(mounted))
        setMounted(true)
    }, [])

    return (
        <foreignObject
            x={0} y={0}
            overflow={'hidden'} id={`${props.node.id}-node-foreign-object`}
            width={props.node.dimensions.width} height={props.node.dimensions.height}
        >
            {props.node.variant === 'bar-vertical' ?
                <HorizontalChart

                    value={{
                        label: 'Cafe',
                        field: props.node.dataset?.value
                    }}
                    axis={{
                        label: 'Eixo',
                        field: props.node.dataset?.axis
                    }}
                    width={props.node.dimensions.width}
                    height={props.node.dimensions.height}
                    title={'Teste para Teste'}
                    data={props.dataset}
                /> : null}
            {props.node.variant === 'bar-horizontal' ?
                <HorizontalChart

                    value={{
                        label: 'Cafe',
                        field: props.node.dataset?.value
                    }}
                    axis={{
                        label: 'Eixo',
                        field: props.node.dataset?.axis
                    }}
                    width={props.node.dimensions.width}
                    height={props.node.dimensions.height}
                    title={'Teste para Teste'}
                    data={props.dataset}
                /> : null}
            {props.node.variant === 'pie' ?
                <PieChart

                    value={{
                        label: 'Cafe',
                        field: props.node.dataset?.value
                    }}
                    axis={{
                        label: 'Eixo',
                        field: props.node.dataset?.axis
                    }}
                    width={props.node.dimensions.width}
                    height={props.node.dimensions.height}
                    title={'Teste para Teste'}
                    data={props.dataset}
                /> : null}
            {props.node.variant === 'line' ?
                <LineChart

                    value={{
                        label: 'Cafe',
                        field: props.node.dataset?.value
                    }}
                    axis={{
                        label: 'Eixo',
                        field: props.node.dataset?.axis
                    }}
                    width={props.node.dimensions.width}
                    height={props.node.dimensions.height}
                    title={'Teste para Teste'}
                    data={props.dataset}
                /> : null}
        </foreignObject>
    )

}

ChartNode.propTypes = {
    node: PropTypes.object,
    dataset: PropTypes.array
}