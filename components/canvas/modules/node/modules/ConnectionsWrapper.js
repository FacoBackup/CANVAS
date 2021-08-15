import PropTypes from 'prop-types'
import {useEffect, useState} from "react";
import ResizeIndicator from "./ResizeIndicator";
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import ConnectionIndicator from "./ConnectionIndicator";

export default function ConnectionsWrapper(props) {
    const [viewBox, setViewBox] = useState({})
    const [canRender, setCanRender] = useState(false)
    const handleViewBox = () => {
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
    }
    const handleMouseEnter = () => {
        setCanRender(true)
    }
    const handleMouseLeave = () => {
        setCanRender(false)
    }
    const handleMouseDown = () => {
        setCanRender(false)
    }
    useEffect(() => {
        handleViewBox()
        const nodeRef = document.getElementById(props.node.id + '-node')

        nodeRef?.addEventListener('mouseenter', handleMouseEnter)
        nodeRef?.addEventListener('mouseleave', handleMouseLeave)
        nodeRef?.addEventListener('mousedown', handleMouseDown)
        return () => {
            nodeRef?.removeEventListener('mousedown', handleMouseDown)
            nodeRef?.removeEventListener('mouseenter', handleMouseEnter)
            nodeRef?.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [props.node.styling])

    return (
        <svg width={props.node.dimensions.width + 20} height={props.node.dimensions.height + 20} x={-10} y={-10}
             visibility={props.selected !== props.node.id && canRender ? 'visible' : 'hidden'}
             opacity={props.selected !== props.node.id && canRender ? '1' : '0'}
             style={{transition: 'opacity 150ms ease-in-out, visibility 150ms ease-in-out'}}
             overflow={'visible'} viewBox={`0 0 ${viewBox.x} ${viewBox.y}`}>

            <ConnectionIndicator node={props.node} viewBox={viewBox} placement={'w'}/>
            <ConnectionIndicator node={props.node} viewBox={viewBox} placement={'e'}/>

            <ConnectionIndicator node={props.node} viewBox={viewBox} placement={'s'}/>
            <ConnectionIndicator node={props.node} viewBox={viewBox} placement={'n'}/>

        </svg>
    )
}

ConnectionsWrapper.propTypes = NodePropsTemplate