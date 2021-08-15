import PropTypes from 'prop-types'
import {useEffect, useState} from "react";
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import ResizeIndicator from "./ResizeIndicator";

export default function SelectedWrapper(props) {
    const [viewBox, setViewBox] = useState({})

    useEffect(() => {
        const height = (props.node.dimensions.height + 20)
        const width = props.node.dimensions.width + 20
        const x = (width / height) * 100
        const y = (height / width) * 100
        if (x > y)
            setViewBox({
                x: x,
                y: x / 2
            })
        else if (x < y)
            setViewBox({
                x: y / 2,
                y: y
            })
        else if (x === y)
            setViewBox({
                x: x,
                y: y
            })

    }, [props.node.styling])

    return (
        <svg width={props.node.dimensions.width + 20} height={props.node.dimensions.height + 20} x={-10} y={-10}
             visibility={props.selected === props.node.id ? 'visible' : 'hidden'}
             opacity={props.selected === props.node.id ? '1' : '0'}
             style={{transition: 'opacity 150ms ease-in-out, visibility 150ms ease-in-out'}}
             overflow={'visible'} viewBox={`0 0 ${viewBox.x} ${viewBox.y}`}>

            <rect stroke={'green'} x={0} y={0} width={viewBox.x} height={viewBox.y} fill={'none'} strokeDasharray={'3,3'}/>

            <ResizeIndicator viewBox={viewBox} placement={'nw'}/>
            <ResizeIndicator viewBox={viewBox} placement={'ne'}/>

            <ResizeIndicator viewBox={viewBox} placement={'sw'}/>
            <ResizeIndicator viewBox={viewBox} placement={'se'}/>

            <ResizeIndicator viewBox={viewBox} placement={'w'}/>
            <ResizeIndicator viewBox={viewBox} placement={'s'}/>
            <ResizeIndicator viewBox={viewBox} placement={'e'}/>
            <ResizeIndicator viewBox={viewBox} placement={'n'}/>
        </svg>
    )
}

SelectedWrapper.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}